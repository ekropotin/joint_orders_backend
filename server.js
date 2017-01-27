const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const MONGO_URL = 'mongodb://' + process.env.MONGO_PORT_27017_TCP_ADDR + ":" + process.env.MONGO_PORT_27017_TCP_PORT + '/maindb';
const API_PORT = process.env.PORT || '3000';

mongoose.connect(MONGO_URL);
const dbConnection = mongoose.connection;

dbConnection.on('error', err => console.log('connection error:', err.message));
dbConnection.once('open', () => console.log("Connected to DB!"));

// Express
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.use('/api', require('./routes/api'));

// Start server
app.listen(API_PORT);
console.log('Listening on port ' + API_PORT);


//TODO:
//https://scotch.io/tutorials/create-a-mean-app-with-angular-2-and-docker-compose/