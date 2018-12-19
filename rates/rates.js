/*
 This module is responsible for loading the reference rates from the ECB API
*/

const https = require('https');
const constants = require('../config/constants');
const winston = require('../config/winston');
const xml2js = require('xml2js');
const cron = require('node-cron');

let eurRateDict = {};
let parser = new xml2js.Parser();

module.exports.loadRates = () => {
  https.get(constants.referenceRatesURL, (response) => {
    let xml = '';

    // A chunk of data has been recieved.
    response.on('data', (chunk) => {
      xml += chunk;
    });

    // Response completed.
    response.on('end', () => {
      winston.info('Loaded reference rates (xml).');

      parser.parseString(xml, (err, parsed) => {
        if (err) {
          winston.error('Encountered an error while parsing xml: ', err.message);
        }

        winston.info('Successfully parsed xml into json.');

        // extract rates from the parsed json object
        const ratesArr = parsed['gesmes:Envelope']['Cube'][0]['Cube'][0]['Cube'];
        for (const rate of ratesArr) {
          const currency = rate['$']['currency'];
          const value = parseFloat(rate['$']['rate']);
          eurRateDict[currency] = value;
        }
        winston.info('Application is now ready with updated rates.');
      });
    });
  }).on('error', (err) => {
    winston.error('Got error while loading reference rates: ' + err.message);
  });
}

module.exports.getRate = (currency) => {
  if (currency === 'EUR') {
    return 1;
  } else {
    return eurRateDict[currency];
  }
}

// start a cron job to update the currency exchange rates everyday at 16:00 CET
cron.schedule(process.env.RATE_UPDATE_CRON, () => {
  winston.info(`Updating the exchange rates.`);
  module.exports.loadRates();
});