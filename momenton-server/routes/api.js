const express = require('express');
const logger = require('../logger/logger');
const { successResponse } = require('../utils/utils');
const jwt = require('jsonwebtoken');

// eslint-disable-next-line new-cap
const router = express.Router();

/** @description Router GET call with '/api/ping' endpoint.
 * @param {request} request from the client app
 * @param {response} response object for the client app
 * @return {response object}
 */
router.get('/ping', (request, response) => {
  logger.info('[+] In the ping');
  return successResponse(
    response,
    '<h1>Pong from Momenton-server Service!</h1>'
  );
});

/** @description Router GET call with '/api/login' endpoint.
 * @param {request} request from the client app
 * @param {response} response object for the client app
 * @return {response object}
 */

router.get('/login', (request, response) => {
  logger.info('[+] In the login');
  const user = {
    id: 1,
    username: 'rahul',
    email: 'rahul.golash@gmail.com'
  };

  jwt.sign({ user }, 'secretkey', { expiresIn: '2 days' }, (err, token) => {
    return successResponse(
      response,
      '<h1>The user exists with the Momenton Server service</h1>',
      token
    );
  });
});

module.exports = router;
