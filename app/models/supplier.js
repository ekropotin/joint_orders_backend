const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: String,
  sku: String,
  price: Number
});

module.exports = schema;
