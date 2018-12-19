/*
 This file defines the different custom middlewares.
*/

module.exports.verifyRequiredQueries = (requiredQueries) => {
  return (req, res, next) => {
      let missingQueries = [];
      for(const requiredQuery of requiredQueries) {
          if(!req.query[requiredQuery]) {
              missingQueries.push(requiredQuery);
          }
      }
      if (missingQueries.length > 0) {
          return res.status(400).json({
              error: `The request is missing these required queries: ${missingQueries.join(", ")}.`
          });
      } else {
          next();
      }
  }
}