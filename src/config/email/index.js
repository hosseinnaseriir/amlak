const nodemailer = require("nodemailer");
const smtpTransporter = require("nodemailer-smtp-transport");

exports.sendEmail = async (to, subject, content) => {
  const transportDetails = smtpTransporter({
    host: "smtp.iran.liara.ir",
    port: 587,
    // secure: true,
    auth: {
      user: "hosseinnaseri",
      pass: "3a4d9b32-7ee7-408e-a337-bc8be9a98325",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const transporter = nodemailer.createTransport(transportDetails);

  const options = {
    from: "mail@hosseinnaseri.ir",
    to,
    subject,
    html: await content,
  };

  transporter.sendMail(options, (err) => {
    console.log(err);
  });
};
