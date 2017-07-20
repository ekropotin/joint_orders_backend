const mongoose = require('mongoose');
const commonPlugin = require('./plugins/common.js');

const schema = new mongoose.Schema({
  _id: Number,
  name: { type: String, required: true },
  description: String,
  address: String,
  phone_numbers: [String],
  rating: Number

});

schema.plugin(commonPlugin('Supplier'));
module.exports = mongoose.model('Supplier', schema);
