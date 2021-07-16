const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const StatusCodes = require('http-status-codes').StatusCodes;
const User = require('../models/user');

const generatePasswordHash = async (password) => {
  const salts = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salts);
};

const login = async (req, res) => {
  const user = await User.findOne({ userName: req.body.username});

  if (!user) {
    return res
      .status(StatusCodes.UNAUTHORIZED).json({
        error: 'user not found'
      });
  }

  const passwordCorrect = await bcrypt.compare(req.body.password, user.password);

  if (!passwordCorrect) {
    return res
      .status(StatusCodes.UNAUTHORIZED).json({
        error: 'password incorrect'
      });
  }

  const token = jwt.sign({ username: user.userName, id: user._id }, process.env.AUTHSECRET);

  res.status(StatusCodes.OK)
    .send({ token: token, user: {
      userId: user.userId,
      userName: user.userName,
      name: user.name,
      email: user.email,
      cart: user.cart.map(i => ({productId: i.productId, quantity: i.quantity})),
      addresses: user.addresses
    } });

};

const registerUser = async (req, res) => {

  try {
    const count = await User.find().countDocuments();
    const passwordHash = await generatePasswordHash(req.body.password);

    const user = await User.create({
      userId: count + 1,
      email: req.body.email,
      userName: req.body.username,
      password: passwordHash,
      name: req.body.name
    });

    const token = jwt.sign({ username: req.body.username, id: user._id}, process.env.AUTHSECRET);

    res.status(StatusCodes.CREATED)
      .send({ token });

  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: error
    });
  }
};

module.exports = {
  login,
  registerUser
};