//install nodemailer

const nodemailer = require('nodemailer');
// const { options } = require('../routes/userRoutes');

const sendEmail = async (options) => {
  //1) create a transporter

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      Pass: process.env.EMAIL_PASSWORD,
    },
    // FOR GMAIL ----ACTIVATE IN GMAIL "LESS SECURE APP" OPTION
  });

  //2) define the email options

  const mailOptions = {
    from: 'devi kumavath <deviii@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html :
  };

  //3) actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
