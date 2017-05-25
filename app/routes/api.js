const app = require('express')();

const routeUsers = require('./users');

app.use('/users', routeUsers);

module.exports = app;
