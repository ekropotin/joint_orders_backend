const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

console.log("NODE_ENV: " + process.env.NODE_ENV);

const MONGO_URL = 'mongodb://mongodb:27017/maindb';
const API_PORT = process.env.PORT || '3000';

mongoose.connect(MONGO_URL);
const dbConnection = mongoose.connection;

dbConnection.on('error', err => console.log('connection error:', err.message));
dbConnection.once('open', () => console.log("Connected  to DB!"));

// Express
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.use('/api/v1', require('./routes/api'));

// Start server
app.listen(API_PORT, () => {
  console.log("Server started on port: " + API_PORT);
  app.emit('started');
});

module.exports = app;