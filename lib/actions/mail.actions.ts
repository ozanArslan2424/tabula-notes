"use server";
var nodemailer = require("nodemailer");
const domain = process.env.NEXT_PUBLIC_URL;

export const sendToken = async (token: string, email: string) => {
  const confirmLink = `${domain}/verify?token=${token}`;

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  var mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "E-posta adresi doğrulama kodu.",
    text: `E-posta adresi doğrulama linki: ${confirmLink}`,
    html: `
    <div style="text-align: center; margin-top: 24px">
        <h1>Merhaba!</h1>
        <p>Aşağıdaki linke tıklayarak Tabula Notlar'a kaydolabilirsin.</p>
        <a style="margin-top: 24px; font-size: large">${confirmLink}</a>
    </div>
    `,
  };

  transporter.sendMail(mailOptions, function (error: Error, info: any) {
    if (error) {
      throw new Error(error.message);
    } else {
      return true;
    }
  });
};

//////////////////////////////////////////////////////////////////////////////////////////////

export const sendRequested = async (email: string) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  var mailOptions = {
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_USER,
    subject: "Tabula Davet Talebi.",
    text: `Bu e-posta adresi Tabula Notlar'a davet kodu istiyor: ${email}`,
    html: `
    <div style="text-align: center; margin-top: 24px">
        <h1>Merhaba!</h1>
        <p>Aşağıdaki e-posta adresi Tabula Notlar'a davet kodu istiyor.</p>
        <p>E-posta adresi:</p>
        <p style="margin-top: 24px; font-size: large">${email}</p>
    </div>
  `,
  };

  transporter.sendMail(mailOptions, function (error: Error, info: any) {
    if (error) {
      throw new Error(error.message);
    } else {
      return true;
    }
  });
};