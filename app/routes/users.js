const app = require('express')();
const UserModel = require('../models/user');
const encryptUtils = require('../utils/encrypt');

app.get('/', (req, res) => {
  UserModel.find({}, (err, results) => {
    if (err) {
      res.send(err);
      return;
    }

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(results));
  });
});

app.post('/', (req, res) => {
  const userObj = Object.assign({}, req.body);
  userObj.password_hash = encryptUtils.hashPassword(userObj.password);
  delete userObj.password;
  const model = new UserModel(userObj);
  model.save((err) => {
    if (err) {
      console.error(err);
      res.send(err);
    } else {
      res.set('Localtion', `/users/${model.id}`);
      res.send(JSON.stringify(model));
    }
  });
});

module.exports = app;
