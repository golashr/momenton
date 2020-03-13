const express = require('express');
const { verifyToken } = require('../utils/utils');
const momentonController = require('../controllers/momenton');

// eslint-disable-next-line new-cap
const router = express.Router();

/** @description Router GET call with '/momenton/getemployees' endpoint.
 * @param {request} request from the client app
 * @param {response} response object for the client app
 * @return {response object}
 */

//router.get('/getemployees', verifyToken, momentonController.getEmployees);
router.get('/getemployees', momentonController.getEmployees);

/** @description Router GET call with '/momenton/employee' endpoint.
 * @param {request} request from the client app
 * @param {response} response object for the client app
 * @return {response object}
 */

router.get('/employee', verifyToken, momentonController.getEmployee);

module.exports = router;
