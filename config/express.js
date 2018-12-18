/*
 This file configures the express app.
 - Adds the body-parser middlewares
 - Binds the API routes
*/

const bodyParser = require('body-parser');

/**
 *
 * @param {*} app - The Express app object
 */
module.exports = function(app) {

  // parse the requests
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());

  // Bind API routes
  require('./routes')(app);
};