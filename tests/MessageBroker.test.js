const chai = require('chai');
const assert = require('chai').assert;
const expect = require('chai').expect;
const AWS = require('aws-sdk-mock')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')

chai.use(sinonChai);
const publish = require('../components/MessageBroker').publish;

describe('TestMessageBrokerComponent', () => {
    beforeEach('setup sandbox', () => {
        this.sandbox = sinon.createSandbox()
        this.publishMessageSpy = sinon.spy();
        AWS.mock('SNS', 'publish', this.publishMessageSpy)

        this.msgBody = "test"
    })
    afterEach('restore sandbox', () => {
        this.sandbox.restore()
    })

    describe('When publish() is called', () => {
        it('Should successfully send message', () => {
            publish(this.msgBody, (data) => data);
            assert.isTrue(this.publishMessageSpy.calledOnce, "sadf");
        });
    })
});




