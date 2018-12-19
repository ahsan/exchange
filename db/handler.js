/**
 * This file defines all the DB handler functions
 */

 const Transaction = require('./transaction.model');
 const winston = require('../config/winston');

 module.exports.createTransaction = function(transaction) {
  Transaction.create(transaction, (err, createdTransaction) => {
    if (err) {
      return winston.error(`Could not write transaction to the DB. Got error: ${err}.`);
    }
    winston.info(`Successfully written a transaction to the DB with the _id: ${createdTransaction._id}`);
  });
 }