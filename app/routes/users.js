const router = require('express').Router();
const UserModel = require('../models/user');
const modelHelper = require('../middlewares/model_helper')(UserModel);
const encryptUtils = require('../utils/encrypt');

router.get('/', modelHelper.findAll(() => ({})));

router.get('/:id', modelHelper.findOne(req => ({ _id: req.params.id })));

router.post('/', modelHelper.create((req) => {
  const userObj = Object.assign({}, req.body);
  userObj.password_hash = encryptUtils.hashPassword(userObj.password);
  delete userObj.password;
  return userObj;
}));

module.exports = router;
