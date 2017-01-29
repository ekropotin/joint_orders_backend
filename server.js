const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const MONGO_PORT = 27017;
const MONGO_HOST = process.env.NODE_ENV === 'development' ? 'localhost': 'mongodb';

const MONGO_URL = 'mongodb://' + MONGO_HOST + ":" + MONGO_PORT + '/maindb';
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
app.use('/api', require('./routes/api'));

// Start server
app.listen(API_PORT);
console.log('Listening on port ' + API_PORT);
