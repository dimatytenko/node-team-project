const nodemailer = require('nodemailer');
const { MAIL_PASSWORD, MAIL_FOR_SENDING } = process.env;

const sendingMail = async ({ mailRecipient, mailText = '', mailHtml = '' }) => {
  const config = {
    host: 'mx1.cityhost.com.ua',
    port: 465,
    secure: true,
    auth: {
      user: MAIL_FOR_SENDING,
      pass: MAIL_PASSWORD,
    },
  };

  const transporter = nodemailer.createTransport(config);
  const emailOptions = {
    from: MAIL_FOR_SENDING,
    to: mailRecipient,
    subject:
      'CONGRATULATIONS, YOU HAVE SUCCESSFULLY REGISTERED ON SlimMoms WEBSITE!',
    text: mailText,
    html: mailHtml,
  };

  transporter.sendMail(emailOptions);
};

module.exports = sendingMail;
