const router = require('express').Router();
const UserModel = require('../models/user');
const encryptUtils = require('../utils/encrypt');
const Errors = require('../utils/errors');
const ErrorCode = require('../constants/error_codes');

router.post('/login', (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).send(Errors.makeError(ErrorCode.INVALID_CREDENTIALS, ''));
  }
  UserModel.findOne({ username: req.body.username }, (err, user) => {
    if (err) return res.status(500).send(Errors.makeError(ErrorCode.GENERAL_SERVER_ERROR, err.errmsg));

    if (!user || !encryptUtils.checkPassword(req.body.password, user.password_hash)) {
      return res.status(400).send(Errors.makeError(ErrorCode.INVALID_CREDENTIALS, ''));
    }
    req.session.user_id = user.id;
    res.status(200).send();
  });
});

module.exports = router;
