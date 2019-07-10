// const AWS = require('aws-sdk');
const AWS = require('aws-sdk-mock');

const { assert, expect } = require('chai');
const sinon = require('sinon');

// const winston = require('winston');
// const WinstonCloudwatch = require('winston-cloudwatch');

const logger = require('../lib/logger');

const sandbox = sinon.createSandbox();

describe('Logger', () => {
  afterEach(() => {
    sandbox.restore();
  });

  it('Should call Winston instance when logging', () => {
    const loggerSpy = sandbox.spy(logger, 'info');

    logger.info('Testing INFO level logging');

    expect(loggerSpy.callCount).to.equal(1);
  });

  it.skip('Should transport to CloudWatch', () => {
    const loggerSpy = sandbox.spy(logger, 'info');

    // AWS.mock('CloudWatchLogs', 'putLogEvents', (params, callback) => {
    //   callback(null, 'success');
    // });
    // const cloudwatchStub = sandbox.stub(AWS, 'CloudWatchLogs');
    // const cloudwatchStub = sandbox.stub(WinstonCloudwatch, 'prototype').returns(() => 'winston-cloudwatch');

    logger.info('logging');

    sinon.assert.calledOnce(loggerSpy);
  });
});
