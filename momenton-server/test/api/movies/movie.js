// process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../../index.js');
const conn = require('../../../components/db.js');
const logger = require('../../../logger/logger.js');

describe('GET /momenton/getemployees', () => {
  before(done => {
    logger.info('[+] before');
    conn
      .connect()
      .then(() => done())
      .catch(err => done(err));
  });

  after(done => {
    logger.info('[+] after');
    conn
      .close()
      .then(() => done())
      .catch(err => done(err));
  });

  it('OK, getting employees has no employees', done => {
    logger.info('[+] Inside test');
    request(app)
      .get('/momenton/getemployees')
      .then(res => {
        const body = res.body;
        expect(body.length).to.equal(0);
        done();
      })
      .catch(err => done(err));
  });
});
