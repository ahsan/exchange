/*
Defines controllers for the exchange routes.
*/

const getRate = require('../../../rates/rates').getRate;
const winston = require('../../../config/winston');

/**
 * GET /exchange
 * Returns the converted value for the exchange query
 * @param req: the request object
 * @param res: the response object
 * @return A JSON object containing response code, message and
 * current server time.
 */
exports.exchange = function (req, res) {

  // req.query contains 'amount', 'from' and 'to'
  const amount = parseFloat(req.query.amount);

  const fromCurrency = req.query.from;
  const toCurrency = req.query.to;

  const toRate = getRate(toCurrency);
  const fromRate = getRate(fromCurrency);

  let responseMessage = {};
  let responseCode = null;

  if (!toRate || !fromRate) { // some unsupported currency is queried
    const errors = [];

    if(!fromRate) {
      errors.push(getNotSupportedStr(fromCurrency));
    }
    if(!toRate) {
      errors.push(getNotSupportedStr(toCurrency));
    }
    responseMessage = {
      errors: errors
    };
    responseCode = 404;
  } else { // both currencies are supported
    const conversionRatio = toRate/fromRate;
    const resultValue = conversionRatio * amount;

    responseMessage = {
      amount: resultValue,
      text: `${amount} ${fromCurrency} = ${resultValue} ${toCurrency}`,
      rate: `1 ${fromCurrency} = ${conversionRatio} ${toCurrency}`,
      rateValue: conversionRatio
    };
    responseCode = 200;
  }

  return res.status(responseCode).json({
    message: responseMessage,
    time: new Date().toString()
  });
};

/**
 * Makes a generic error string for unsupported currencies.
 */
getNotSupportedStr = (currency) => {
  winston.error(`Unsupported currency: ${currency}`);
  return `Currency '${currency}' is not supported. Please make sure that its specification conforms to ISO 4217 code standard.`
}