const chai = require('chai');
const assert = require('chai').assert;
const expect = require('chai').expect;
const AWS = require('aws-sdk');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { mockReq, mockRes } = require('sinon-express-mock');
const { healthCheck, sendMessage } = require('../routes/status');

chai.use(sinonChai);

describe('TestStatusRoutes', () => {
  beforeEach('setup sandbox', () => {
    this.sandbox = sinon.createSandbox();
    this.sandbox.stub(AWS, 'SNS');

    const request = {
      body: {},
    };

    this.req = mockReq(request);
    this.res = mockRes();
  });
  afterEach('restore sandbox', () => {
    this.sandbox.restore();
  });

  describe('healthCheck()', () => {
    it('Should be called with 200', () => {
      healthCheck(this.req, this.res);
      expect(this.res.sendStatus).to.be.calledWith(200);
    });
  });

  describe('sendMessage()', () => {
    it('Should successfully send message', () => {
      sendMessage(this.req, this.res);
      expect(this.res.sendStatus).to.be.calledWith(200);
    });

    it('Should fail to send message', () => {
      sendMessage(this.req, this.res);
      expect(this.res.sendStatus).to.be.calledWith(500);
    });
  });
});
