const AppContext = require('../data/appContext');
const UserModel = require('../models/user');
const encryptUtils = require('../utils/encrypt');
const UserRoles = require('../constants/userRoles');

const ADMIN_USER_NAME = 'admin';

exports.checkSecret = (req, res) => {
  console.info(`Access to secret from address ${req.connection.remoteAddress}. Provided secret: ${req.params.secret}`);
  if (req.params.secret !== AppContext.secret) {
    res.statusCode = 404;
    return res.send({ error: 'Wrong secret' });
  }
  return res.send('OK');
};

exports.createAdmin = (req, res) => {
  console.info(`Request to create admin from address ${req.connection.remoteAddress}.`);
  const password = req.body.password;
  if (!password) {
    res.statusCode = 400;
    return res.send({ error: 'No password provided' });
  }
  UserModel.find({ name: ADMIN_USER_NAME }, (err, results) => {
    if (err) {
      console.error(err);
      res.statusCode = 500;
      return res.send({ error: err });
    }
    if (results.length > 0) {
      res.statusCode = 403;
      return res.send({ error: 'Admin is already created' });
    }

    const admin = new UserModel({
      name: ADMIN_USER_NAME,
      role: UserRoles.ADMIN,
      password_hash: encryptUtils.hashPassword(password)
    });

    admin.save((err) => {
      if (!err) {
        return res.send('OK');
      }
      console.error(err);
      res.statusCode = 500;
      res.send({ error: err });
    });
  });
};
