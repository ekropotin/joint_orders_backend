const Users = require('../models/user');
const Errors = require('../utils/errors');
const ErrorCode = require('../constants/error_codes');

module.exports = function (requiredRoles) {
  return function (req, res, next) {
    if (!req.session.user_id) {
      return res.status(401).send();
    }
    Users.findById(req.session.user_id, (err, user) => {
      if (err) return res.status(500).send(Errors.makeError(ErrorCode.GENERAL_SERVER_ERROR, err.errmsg));

      if (requiredRoles.includes(user.role)) {
        next();
      } else {
        res.status(401).send();
      }
    });
  };
};
