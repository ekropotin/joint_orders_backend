const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const dbInit = require('./workflow/dbinit');
const routeApi = require('./routes/api');

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);

const MONGO_URL = 'mongodb://mongodb:27017/maindb';
const API_PORT = process.env.PORT || '3000';

mongoose.connect(MONGO_URL, { config: { autoIndex: process.env.NODE_ENV !== 'production' } });

const dbConnection = mongoose.connection;

dbConnection.on('error', err => console.log(`connection error: ${err.message}`));
dbConnection.once('open', () => {
  console.log('Connected  to DB!');
  dbInit();
});

// Express
const app = express();

// TODO: expiration?
app.use(session({
  store: new MongoStore({ mongooseConnection: dbConnection }),
  secret: '6094294724'
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/v1', routeApi);

// Start server
app.listen(API_PORT, () => {
  console.log(`Server started on port: ${API_PORT}`);
  app.emit('started');
});

module.exports = app;
