const jwt = require('jsonwebtoken');

/** @description Enriched Success response for the client
 * @param {response} request from the client app
 * @param {message} message string for the client app
 * @param {data} response object for the client app
 * @return {response object}
 */

const successResponse = (response, message = null, data = null) => {
  response.status(200).send({
    success: true,
    timestamp: Date.now(),
    message,
    data
  });
};

/** @description Enriched error response for the client
 * @param {response} request from the client app
 * @param {message} message string for the client app
 * @param {status} 403 status for the client app
 * @return {response object}
 */

const errorResponse = (response, message, status = 403) => {
  response.status(status).send({
    success: false,
    timestamp: Date.now(),
    message
  });
};

/** @description create JWT token
 * @param {user} user object
 * @return {response object}
 */

const createToken = user => {
  // eslint-disable-next-line no-multi-spaces
  // { expiresIn: '2 days' },
  jwt.sign({ user }, 'secretkey', { expiresIn: '2 days' }, (err, token) => {
    return token;
  });
};

/** @description FORMAT OF TOKEN Authorization: Bearer <access_token>
 * @param {response} request from the client app
 * @param {message} message string for the client app
 * @param {status} 403 status for the client app
 * @return {response object}
 */

const verifyToken = (request, response, next) => {
  // Get auth header value
  const bearerHeader = request.headers.authorization;

  // Check if bearerHeader is undefined
  if (typeof bearerHeader !== 'undefined') {
    // Split at the space
    const momentonTokens = bearerHeader.split(' ');

    // Get token from array
    const momentonToken = momentonTokens[1];

    // Set the token
    request.token = momentonToken;

    jwt.verify(request.token, 'secretkey', (err, authData) => {
      if (err) {
        response.sendStatus(403);
      } else {
        request.authData = authData;

        // Next middleware
        // eslint-disable-next-line callback-return
        next();
      }
    });
  } else {
    errorResponse(response, 'Forbidden');
  }
};

// Verify AccessToken
const verifyAccessToken = (request, response, next) => {
  // Get auth header value
  // eslint-disable-next-line space-infix-ops
  const momentonHeader = request.headers.xaccesstoken;

  // Check if momentonHeader is undefined
  if (typeof momentonHeader !== 'undefined') {
    if (momentonHeader === 'sjd1HfkjU83ksdsm3802k') {
      request.authData = authData;

      // Next middleware
      // eslint-disable-next-line callback-return
      next();
    }
  } else {
    errorResponse(response, 'Forbidden');
  }
};

exports.successResponse = successResponse;
exports.errorResponse = errorResponse;
exports.verifyToken = verifyToken;
exports.createToken = createToken;
exports.verifyAccessToken = verifyAccessToken;
