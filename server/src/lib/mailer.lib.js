const nodemailer = require("nodemailer");
const config = require("./config.lib");

const mailer = nodemailer.createTransport({
  host: config.SMTP_HOST,
  port: config.SMTP_PORT,
  auth: {
    user: config.SMTP_USER,
    pass: config.SMTP_PASS,
  },
});

module.exports = mailer;
