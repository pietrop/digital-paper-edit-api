const aws = require('aws-sdk');
const awsConfig = aws.config;
const SNS = aws.SNS;

awsConfig.update({region: process.env.AWS_REGION});

const sns = new SNS({apiVersion: '2010-03-31'});
const topicArn = [
  'arn:aws:sns',
  process.env.AWS_REGION,
  process.env.AWS_ACCOUNT,
  process.env.SNS_TOPIC
].join(":")

const publish = (msg, cb) => {
  let params = {
    Message: msg,
    TopicArn: topicArn
  }

  sns.publish(params, () => {
    return cb();
  })
}

module.exports = { publish }
