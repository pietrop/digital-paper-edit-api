const chai = require('chai');
const { assert, expect } = require('chai');
const AWSMock = require('aws-sdk-mock')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const { publish } = require('../components/MessageBroker');

chai.use(sinonChai);
describe('TestMessageBrokerComponent', () => {
    beforeEach('setup sandbox', () => {
        this.sandbox = sinon.createSandbox()
        this.publishMessageSpy = sinon.spy();
        this.AWSMock = AWSMock
        this.AWSMock.mock('SNS', 'publish', this.publishMessageSpy)

        this.msgBody = "test"
    })
    afterEach('restore sandbox', () => {
        this.sandbox.restore()
        this.AWSMock.restore('SNS', 'publish');
    })

    describe('When publish() is called', () => {
        it('Should successfully send message', () => {
            publish(this.msgBody, (err, data) => {
                if (err) {
                    console.log(err)
                } else {
                    const expectedParams = {
                        Message: this.msgBody,
                        TopicArn: ""
                      }
                      assert.isTrue(this.publishMessageSpy.calledWith(expectedParams), 'should pass correct parameters');
                }
            });
        });
    })
});




