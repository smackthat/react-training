const Order = require('../models/order');

const getOrders = async (req, res) => {

  const orders = await Order
    .find({ userId: req.body.userid })
    .select('-userId');
  
  res.json(orders);
};

const createOrder = (req, res) => {

};

module.exports = {
  getOrders,
  createOrder
}