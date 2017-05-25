const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence');

const schema = new mongoose.Schema({
  username: { type: String, required: true, index: { unique: true } },
  role: { type: String, required: true },
  password_hash: { type: String, required: true },
  full_name: String,
  email: String,
  phone_number: String
});

schema.plugin(autoIncrement, { inc_field: 'id' });

module.exports = mongoose.model('User', schema);
