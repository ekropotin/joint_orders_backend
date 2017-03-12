const bcrypt = require('bcrypt-nodejs');

exports.hashPassword = password => bcrypt.hashSync(password);

exports.checkPassword = (password, hash) => bcrypt.compareSync(password, hash);
