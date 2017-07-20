const mongoose = require('mongoose');
const commonPlugin = require('./plugins/common.js');

const schema = new mongoose.Schema({
  _id: Number,
  name: { type: String, required: true },
  base_price: { type: Number, required: true },
  supplier_id: { type: Number, required: true, hideJSON: true }
});

schema.plugin(commonPlugin('MenuItem'));
module.exports = mongoose.model('MenuItem', schema);
