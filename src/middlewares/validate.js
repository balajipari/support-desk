const { validationResult } = require('express-validator');
/**
 * Extracts the validation errors from a request and makes them available in a Result object.
 * Each error is transformed into key-value objects from array
 */
module.exports = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = {};
    errors.array().forEach((err) => {
      error[err.param] = err.msg;
    });
    return res.status(422).json({ error });
  }
  return next();
};
