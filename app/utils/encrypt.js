const bcrypt = require('bcrypt-nodejs');

exports.hashPassword = password => bcrypt.hashSync(password);
