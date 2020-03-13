const mongoose = require('mongoose');
const config = require('../config/config');
const momentonController = require('../controllers/momenton');
const employee = require('../models/employee');
const logger = require('../logger/logger');

const DB_URI = `mongodb://${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.dbName}`;

/** @description Connect with the MongoDB with given URI.
 */

exports.connect = () => {
  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV === 'test') {
      const Mockgoose = require('mockgoose').Mockgoose;
      const mockgoose = new Mockgoose(mongoose);

      mockgoose.prepareStorage().then(() => {
        mongoose
          .connect(DB_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
          })
          .then((res, err) => {
            if (err) {
              logger.error(`[+] Connection with MongoDB failed ${DB_URI}`);
              return reject(err);
            }
            logger.info(`[+] Connected to MongoD at ${DB_URI}`);
            resolve();
          });
      });
    } else {
      mongoose
        .connect(DB_URI, {
          useNewUrlParser: true,
          useCreateIndex: true,
          useFindAndModify: false,
          useUnifiedTopology: true
        })
        .then((res, err) => {
          if (err) {
            logger.error(`[+] Connection with MongoDB failed ${DB_URI}`);
            return reject(err);
          }
          logger.info(`[+] Connected to MongoD at ${DB_URI}`);
          resolve();
        });
    }
  });
};

/** @description Initialize Database with initial data
 */

exports.initializeDatabase = () => {
  employee.countDocuments((err, number) => {
    logger.info(`[+] No of employees in record ${number}`);
    if (number <= 0) {
      momentonController.addEmployees();
    }
  });
};

/** @description Close the MongoDB connection.
 * @return {promise}
 */

exports.close = () => {
  return mongoose.disconnect();
};
