const express = require('express');
const logger = require('../logger/logger');
var { successResponse } = require('../utils/utils');

// eslint-disable-next-line new-cap
const router = express.Router();

/** @description Router GET call with '/' endpoint.
 * @param {request} request from the client app
 * @param {response} response object for the client app
 * @return {response object}
 */

router.get('/', (request, response) => {
  logger.info('[+] In the root');
  return successResponse(
    response,
    '<h1>Hello from Momenton-server Service!</h1>'
  );
});

module.exports = router;
