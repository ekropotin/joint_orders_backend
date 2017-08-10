const mongoose = require('mongoose');
const commonPlugin = require('./plugins/common');
const encryptUtils = require('../utils/encrypt');

const schema = new mongoose.Schema({
  _id: Number,
  username: { type: String, required: true, index: { unique: true } },
  role: { type: String, required: true },
  password_hash: { type: String, required: true, hideJSON: true },
  full_name: String,
  email: { type: String, index: { unique: true } },
  phone_number: String
});

schema.methods.checkPassword = function (password) {
  return this.password_hash === encryptUtils.hashPassword(password);
};

schema.plugin(commonPlugin('User'));
module.exports = mongoose.model('User', schema);
