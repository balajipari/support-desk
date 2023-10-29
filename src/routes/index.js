const Router = require('express').Router();
const Category = require('./category');
const Ticket = require('./ticket');

// simple test route
Router.get('/', (req, res) => {
  res.json({
    message: 'OK',
    timestamp: new Date().toISOString(),
    IP: req.ip,
    URL: req.originalUrl,
  });
});

Router.use('/tickets', Ticket);
Router.use('/categories', Category);

module.exports = Router;
