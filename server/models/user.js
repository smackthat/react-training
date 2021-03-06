const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const cartItem = require('./cartItem');
const address = require('./address');

const userSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true,
    unique: true
  },
  userName: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  cart: [cartItem.schema],
  addresses: [address.schema],
  name: String,
  email: String

}, {timestamps: true});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('user', userSchema);