var nodemailer = require("nodemailer");
const domain = process.env.NEXT_PUBLIC_APP_URL;
//-----------------------------------------------------------------------------

export async function sendVerificationEmail(email: string, token: string) {
  const confirmLink = `${domain}/new-verification?token=${token}`;

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PWD,
    },
  });

  var mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: email,
    subject: "E-posta adresi doğrulama linki.",
    text: `E-posta adresini doğrulamak için link: ${confirmLink}`,
    html: `<p>E-posta adresini doğrulamak için <a href="${confirmLink}">buraya tıkla.</a></p>`,
  };

  transporter.sendMail(mailOptions, function (error: Error, info: any) {
    if (error) {
      throw new Error(error.message);
    } else {
      console.log("Email Sent");
      return true;
    }
  });
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetLink = `${domain}/new-password?token=${token}`;

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PWD,
    },
  });

  var mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: email,
    subject: "Şifre sıfırlama linki.",
    text: `<p>Unuttuğun şifreni sıfırlamak için link: ${resetLink}`,
    html: `<p>Unuttuğun şifreni sıfırlamak için <a href="${resetLink}">buraya tıkla.</a></p>`,
  };

  transporter.sendMail(mailOptions, function (error: Error, info: any) {
    if (error) {
      throw new Error(error.message);
    } else {
      console.log("Email Sent");
      return true;
    }
  });
}

export async function sendTwoFactorEmail(email: string, token: string) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PWD,
    },
  });

  var mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: email,
    subject: "İki faktörlü kimlik doğrulama kodu.",
    text: `İki faktörlü kimlik doğrulama kodun:${token}`,
    html: `<p>İki faktörlü kimlik doğrulama kodun: <strong style="font-size: 3rem">${token}</strong></p>`,
  };

  transporter.sendMail(mailOptions, function (error: Error, info: any) {
    if (error) {
      throw new Error(error.message);
    } else {
      console.log("Email Sent");
      return true;
    }
  });
}
