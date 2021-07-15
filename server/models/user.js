const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const cartItem = require('./cartItem');

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
  addresses: [{
    type: mongoose.Schema.ObjectId,
    ref: 'address'
  }],
  name: String,
  email: String

}, {timestamps: true});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('user', userSchema);