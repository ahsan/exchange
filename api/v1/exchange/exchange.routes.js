/*
 Binds routes for the exchange module.
*/

const express = require('express');
const mw = require('../middlewares/request.validation');
const controller = require('./exchange.controller');

let router = new express.Router();

// GET /exchange
router.get('/', mw.verifyRequiredQueries(['amount', 'from', 'to']), controller.exchange);

module.exports = router;