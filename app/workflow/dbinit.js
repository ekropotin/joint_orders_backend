const UserRoles = require('../constants/userRoles');
const encryptUtils = require('../utils/encrypt');
const UserModel = require('../models/user');

const ADMIN_DEFAULT_NAME = 'admin';
const ADMIN_DEFAULT_PASSWORD = 'admin';

module.exports = () => {
  // Can't require on the top of file since autoIncrement plugin could be not initialized.
  console.log('Initializing database');
  // Create default admin if neccessary
  UserModel.find({ username: ADMIN_DEFAULT_NAME }, (err, results) => {
    if (err) {
      console.error(err);
      return;
    }
    if (results.length > 0) {
      console.log('Default admin already exists');
      return;
    }

    const admin = new UserModel({
      username: ADMIN_DEFAULT_NAME,
      role: UserRoles.ADMIN,
      password_hash: encryptUtils.hashPassword(ADMIN_DEFAULT_PASSWORD)
    });

    admin.save((err) => {
      if (err) {
        console.error(err);
      } else {
        console.log('Default admin created');
      }
    });
  });
};
