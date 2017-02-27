const restful = require('node-restful');

const mongoose = restful.mongoose;

const userSchema = new mongoose.Schema({
  name: String,
  fullName: String,
  password_hash: String,
  contactInfo: {
    email: String,
    phone: String
  },
  role: String
});

module.exports = restful.model('user', userSchema);
