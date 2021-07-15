const User = require('../models/user');
const StatusCodes = require('http-status-codes').StatusCodes;
const getReasonPhrase = require('http-status-codes').getReasonPhrase;

const getUser = async (req, res) => {
  const id = +req.params.id;
  
  const user = await User
    .findOne({ userId: id })
    .select('-_id userId userName name email addresses cart.productId cart.quantity');

  if (!user) {
    res.status(StatusCodes.NOT_FOUND).json({
      error: 'user not found'
    });
  }

  res.json(user);
};

const updateUser = async (req, res) => {
  const id = +req.params.id;

  const user = await User.findOne({ userId: id});

  user.email = req.body.email ?? user.email;
  user.name = req.body.name ?? user.name;
  user.cart = req.body.cart ?? user.cart;
  user.addresses = req.body.addresses ?? user.addresses;

  await user.save();

  res.status(StatusCodes.OK)
    .json({
      status: getReasonPhrase(StatusCodes.OK)
    });

};

module.exports = {
  getUser,
  updateUser
};