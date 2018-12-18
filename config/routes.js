/*
 This file defines and binds the API routes.
*/

const winston = require('./winston');
const constants = require('./constants');

/**
 *
 * @param {*} app - The Express app object
 */
module.exports = function (app) {

    // bind routes to all api endpoints of all versions
    for (const version of constants.apiVersions) {

        winston.debug(`Binding ${version} routes`);

        // ping endpoint
        app.use(`/${version}/ping`, require(`../api/${version}/ping/ping.routes`));
    }

    // default route
    app.route('/*').get((req, res) => {
        winston.verbose('Illegal API endpoint hit: ', req.url);

        // respond with 404
        res.status(404);
        res.json({
            message: 'API endpoint not implemented.'
        });

    });
};