require('dotenv').config();

const express = require('express');
const Routes = require('./routes/index');
const db = require('./models/index');
const Middlewares = require('./middlewares/index');

const app = express();

// Cors options configured
app.use(Middlewares.cors);

// Parses application/json, basically parses incoming Request Object as a JSON Object
app.use(express.json());

// Parses incoming Request Object if object, with nested objects, or generally any type.
app.use(express.urlencoded(Middlewares.urlencodedParser));

// Morgan middleware for logging HTTP requests in the application
app.use(Middlewares.morgan);

// Parse and extract user agent information using the "useragent" middleware that provides the user's device/browser/os details
app.use(Middlewares.useragent);

// Test the db connection
db.sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err.original);
  });

// configure Routes
app.use('/api', Routes);

app.use((req, res) => {
  res.header('Content-Type', 'application/json');
  res.status(404);
  res.send({ message: 'Not Found' });
});

// set port, listen for requests
app.listen(process.env.API_PORT, () => {
  console.log(`Server is running on port ${process.env.API_PORT}.`);
});

module.exports = app;
