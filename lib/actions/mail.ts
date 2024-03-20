"use server";
var nodemailer = require("nodemailer");
const domain = process.env.NEXT_PUBLIC_URL;

export const sendToken = async (token: string, email: string) => {
  const confirmLink = `${domain}/verify?token=${token}`;

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  var mailOptions = {
    from: process.env.MAIL_FROM,
    to: email,
    subject: "E-posta adresi doğrulama kodu.",
    text: `E-posta adresi doğrulama linki: ${confirmLink}`,
    html: `<p>E-posta adresi doğrulama linki: <a>${confirmLink}</a></p>`,
  };

  transporter.sendMail(mailOptions, function (error: Error, info: any) {
    if (error) {
      throw new Error(error.message);
    } else {
      return true;
    }
  });
};
