const AWS = require('aws-sdk');
const ses = new AWS.SES({ region: 'us-east-1' });

AWS.config.update({
    accessKeyId: 'Access_Key',
    secretAccessKey: 'secretAccessKey'
  });
  
exports.handler = async (event, context) => {
  console.log("event------",event)
  const params = {
    Destination: {
      ToAddresses: [event.body.to]
    },
    Message: {
      Body: {
        Html: {
          Data: event.body.message
        }
      },
      Subject: {
        Data: event.body.subject
      }
    },
    Source: 'noreply@example.com'
  };

  try {
    await ses.sendEmail(params).promise();
    return {
      statusCode: 200,
      body: 'Email sent successfully'
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error)
    };
  }
};
console.log("Hello Devendra");
console.log("handeler----------",exports.handler)