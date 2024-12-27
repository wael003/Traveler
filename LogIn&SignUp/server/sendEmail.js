const nodeMailer = require("nodemailer");

const transporter = nodeMailer.createTransport({
    host : "smtp.gmail.com",
    port : 587,
    secure : false,
    auth: {
      user: 'waelalmallah7@gmail.com', // your email
      pass: 'sgkk nxmf vbcr iuvj', // your password
          },
    tls: {
      rejectUnauthorized: false
    },
    connectionTimeout : 5000,
    greetingTimeout : 3000,
  });

  
  module.exports = transporter;

  