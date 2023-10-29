const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const useragent = require('express-useragent');

/**
 * Middleware for setting security-related HTTP headers.
 * Helps protect your application from common web vulnerabilities.
 */
exports.helmet = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ['self'],
    },
  },
});

/**
 * Middleware for enabling Cross-Origin Resource Sharing (CORS).
 * Allows or restricts cross-origin HTTP requests for added security.
 */
exports.cors = cors({
  corsOptions: {
    origin: true,
    credentials: true,
  },
});

/**
 * Middleware for parsing URL-encoded form data.
 * Parses data from form submissions in request bodies.
 */
exports.urlencodedParser = {
  extended: true,
};

/**
 * Middleware for HTTP request logging.
 * Generates logs of incoming requests in a specified format.
 */
exports.morgan = morgan('common');

/**
 * Middleware for extracting user-agent information from requests.
 * Provides information about the client's user-agent (browser or device).
 */
exports.useragent = useragent.express();
