import axios from 'axios';

const AUTH_TOKEN = 'Bearer ';
const entity = `http://${window.location.hostname}:3011/momenton/getemployees`;
const loginURL = `http://${window.location.hostname}:3011/api/login`;
console.log(entity);

export const getEmployees = () => {
  return new Promise(function(resolve, reject) {
    getLoginToken(loginURL).then(token => {
      getEmployeesData(entity, token.data)
        .then(employees => {
          resolve(employees.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  });
};

/** @description Retrieve the login token from the given service.
 * @param {url} URL of the remote service
 * @return {response data}
 */

export const getLoginToken = () => {
  console.log(`[+] Login token to retrieve from ${loginURL}`);
  return new Promise((resolve, reject) => {
    axios
      .get(loginURL, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        timeout: 2000
      })
      .then(response => {
        console.log('[+] The login token retrieved from the given service.');
        resolve(response.data);
      })
      .catch(error => {
        console.log(
          `[+] The service returned error with the given ID. ${error}`
        );
        reject(error);
      });
  });
};

/** @description Retrieve the login token from the given service.
 * @param {url} URL of the remote service
 * @return {response data}
 */

export const getEmployeesData = (entity, token) => {
  console.log(`[+] Login token to retrieve from ${entity} ${token}`);
  const authToken = `${AUTH_TOKEN}${token}`;
  console.log(`[+] authtoken ${authToken}`);
  return new Promise((resolve, reject) => {
    axios
      .get(entity, {
        headers: {
          Authorization: authToken,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        timeout: 2000
      })
      .then(response => {
        console.log('[+] The employee data retrieved from the given service.');
        resolve(response.data);
      })
      .catch(error => {
        console.log(
          `[+] The service returned error with the given ID. ${error}`
        );
        reject(error);
      });
  });
};
