/**
 * This file defines the MongoDB schema for the transactions collection.
 */

const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true
  },
  from: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Transaction', transactionSchema);