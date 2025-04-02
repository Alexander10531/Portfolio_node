import * as AWS from 'aws-sdk';

AWS.config.update({
  region: 'us-east-2' 
});

const ses = new AWS.SES();

export const sendEmail = (params: AWS.SES.Types.SendEmailRequest) => {
    return new Promise((resolve, reject) => {
      ses.sendEmail(params, (err, data) => {
        if (err) {
          reject('Error: ' + err);
        } else {
          resolve('Éxito: ' + data);
        }
      });
    });
  };
