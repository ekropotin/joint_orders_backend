const mongoose = require('mongoose');
const commonPlugin = require('./plugins/common.js');

const schema = new mongoose.Schema({
  _id: Number,
  username: { type: String, required: true, index: { unique: true } },
  role: { type: String, required: true },
  password_hash: { type: String, required: true, hideJSON: true },
  full_name: String,
  email: String,
  phone_number: String
});

schema.plugin(commonPlugin('User'));
module.exports = mongoose.model('User', schema);
