/* eslint-disable no-redeclare */
/* eslint-disable block-scoped-var */
/* eslint-disable guard-for-in */
const initialData = require('../models/initialdata');
const Employee = require('../models/employee');
const { successResponse, errorResponse } = require('../utils/utils');
const logger = require('../logger/logger');

/** @description Retrieve the employee(s) against the ID from the MongoDB.
 * @param {request} request from the client app
 * @param {response} response object for the client app
 * @return {response object}
 */

exports.getEmployee = (request, response) => {
  logger.info(`[+] Employee ID to look for ${request.query.ID}`);
  Employee.find(
    {
      ID: request.query.ID
    },
    (err, employees) => {
      if (err) {
        logger.error(`[+] getEmployee -- error getting employee ${err}`);
        return errorResponse(
          response,
          '<h1>Momenton Server service failed while getting employee.</h1>'
        );
      } else {
        employees.forEach(employee => {
          logger.info(
            `[+] Momenton Server service retrieved employee. ${employee.ID}, ${employee.employeeName}, ${employee.managerID}`
          );
        });
        logger.info(
          `[+] The employee exists with the given ID Momenton Server service ${employees}`
        );
        return successResponse(
          response,
          '<h1>The employee exists with the given ID Momenton Server service.</h1>',
          employees
        );
      }
    }
  );
};

/** @description Retrieve all employees from the MongoDB.
 * @param {request} request from the client app
 * @param {response} response object for the client app
 * @return {response object}
 */

exports.getEmployees = (request, response) => {
  logger.info('[+] Employees to look from Momenton-server Service');
  Employee.find((err, employees) => {
    if (err) {
      logger.error(`[+] getEmployees -- error getting employees ${err}`);
      return errorResponse(
        response,
        '<h1>Momenton Server service failed while getting employees.</h1>'
      );
    } else {
      logger.info(
        `[+] Momenton Server service returns all listed employees. ${employees}`
      );

      // lets print the data on console!
      var rejiggedData = rejigData(employees);
      var jsonPretty = JSON.stringify(rejiggedData, null, '\t');
      console.log(jsonPretty);

      return successResponse(
        response,
        '<h1>Momenton Server service returns all listed employees.</h1>',
        employees
      );
    }
  });
};

/** @description Retrieve the employee(s) after setting up the hierarchy.
 * @param {employees} employees from the called method
 * @param {response} response object for the client app
 * @return {response object}
 */

rejigData = employees => {
  // Manipulate Data to object with string keys that can be easily referenced later
  var hierarchicalData = {};
  employees.forEach(employee => {
    var key = 'id' + employee.ID;
    var employee1 = employee.toObject({
      transform: (doc, ret) => {
        delete ret._id;
        delete ret.createdAt;
        delete ret.updatedAt;
        delete ret.__v;
        return ret;
      }
    });
    hierarchicalData[key] = employee1;
  });

  // add child container array to each node
  for (var index in hierarchicalData) {
    hierarchicalData[index].reportees = [];
  }

  // populate the child container arrays
  // eslint-disable-next-line guard-for-in
  // eslint-disable-next-line no-redeclare
  for (var index in hierarchicalData) {
    var parentkey = 'id' + hierarchicalData[index].managerID;
    if (hierarchicalData[parentkey]) {
      hierarchicalData[parentkey].reportees.push(hierarchicalData[index]);
    }
  }

  // find the root nodes (no parent found) and create the hierarchy tree from them
  var treeRoot = [];
  for (var index in hierarchicalData) {
    var parentkey = 'id' + hierarchicalData[index].managerID;
    if (!hierarchicalData[parentkey]) {
      treeRoot.push(hierarchicalData[index]);
    }
  }
  return treeRoot;
};

/** @description Add new employee from initial data to the MongoDB.
 * @param {request} request from the client app
 * @param {response} response object for the client app
 * @return {response object}
 */

exports.addEmployees = () => {
  initialData.forEach(data => {
    var employee = new Employee();
    employee.ID = data.ID;
    employee.employeeName = data.employeeName;
    employee.managerID = data.managerID;
    employee.save(err => {
      if (err) {
        logger.error(`[+] addEmployee -- error adding employee ${err}`);
      } else {
        logger.info(
          `[+] Momenton Server service added employee successfully. ${employee.employeeName}`
        );
      }
    });
  });
};

/** @description Add new employee from initial data to the MongoDB.
 * @param {request} request from the client app
 * @param {response} response object for the client app
 * @return {response object}
 */

printData = rejiggedData => {
  rejiggedData.forEach(data => {
    console.log(`${data.employeeName} has following reportees`);
    data.reportees.forEach(reportee => {
      console.log(`${reportee.employeeName}`);
      reportee.reportees.forEach(reptee => {
        console.log(`${reptee.employeeName}`);
      });
    });
  });
};
