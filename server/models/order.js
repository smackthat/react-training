const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true
  },
  orderDate: {
    type: Date,
    required: true
  },
  deliveryDate: {
    type: Date,
    required: true
  },
  billingMethod: {
    type: Number,
    min: 0,
    max: 2
  },
  deliveryAddress: {
    type: mongoose.Schema.ObjectId,
    ref: 'address',
    required: true
  },
  billingAddress: {
    type: mongoose.Schema.ObjectId,
    ref: 'address'
  },
  cart: [{
    type: mongoose.Schema.ObjectId,
    ref: 'cartItem'
  }]
  
});

module.exports = mongoose.model('order', orderSchema);