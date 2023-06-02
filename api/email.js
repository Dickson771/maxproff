const nodemailer = require("nodemailer");

const password = "X-m2k{EP={!i";
const email = "contact@bestproff.com";

let configOptions = {
  host: "mail.bestproff.com",
  port: 465,
  tls: {
    rejectUnauthorized: true,
    minVersion: "TLSv1.2",
  },
};

let transporter = nodemailer.createTransport({
  host: configOptions.host,
  port: configOptions.port,
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
