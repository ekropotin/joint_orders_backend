const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const AppContext = require('./data/appContext');
const routeSecret = require('./routes/secret');

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);

const MONGO_URL = 'mongodb://mongodb:27017/maindb';
const API_PORT = process.env.PORT || '3000';

mongoose.connect(MONGO_URL);
const dbConnection = mongoose.connection;

dbConnection.on('error', err => console.log(`connection error: ${err.message}`));
dbConnection.once('open', () => console.log('Connected  to DB!'));

// Express
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const secret = AppContext.secret = crypto.randomBytes(16).toString('hex');
console.log(`Secret url: /api/v1/secret/${secret}`);

// Routes
app.get('/api/v1/secret/:secret', routeSecret.checkSecret);
app.post(`/api/v1/secret/${secret}/admins`, routeSecret.createAdmin);

app.use('/api/v1', require('./routes/api'));

// Start server
app.listen(API_PORT, () => {
  console.log(`Server started on port: ${API_PORT}`);
  app.emit('started');
});

module.exports = app;
