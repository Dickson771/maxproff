const nodemailer = require("nodemailer");

const password = process.env.MAIL_PASSWORD;
const email = process.env.MAIL_USERNAME;

let transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 465,
  secure: true,
  auth: {
    user: email,
    pass: password,
  },
});

let sendEmail = (subject, text, html) => {
  let mailOptions = {
    from: email,
    to: "ekkinyanjui@gmail.com",
    subject: subject,
    text: text,
    html: html,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log(`Message sent: ${info.messageId}`);
  });
};

module.exports = sendEmail;
