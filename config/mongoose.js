/*
 This file is responsible for the configuration and connection with MongoDB.
*/

let mongoose = require('mongoose');
let winston = require('./winston');

const dbUrl = `${process.env.DB_URL}/exchange`
mongoose.connect(dbUrl);

const db = mongoose.connection;

db.on('error', (err) => {
  winston.error(`MongoDB connection error: ${err}. Exiting.`);
  process.exit(1);
});

db.on('open', () => {
  winston.info(`Connected to MongoDB on ${dbUrl}`);
});