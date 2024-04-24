"use server";
var nodemailer = require("nodemailer");
const domain = process.env.NEXT_PUBLIC_URL;

export const sendEmail = async ({
  type,
  email,
  token,
  content,
}: {
  type: "invite" | "request" | "bug";
  email?: string;
  token?: string;
  content?: string;
}) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  var mail = {
    to: email,
    subject: "",
    text: "",
    html: "",
  };

  if (type === "invite") {
    const inviteLink = `${domain}/invited?token=${token}`;

    mail = {
      to: email,
      subject: "Tabula Davet Kodu.",
      text: `E-posta adresi doğrulama linki: ${inviteLink}`,
      html: `
      <div style="text-align: center; margin-top: 24px">
          <h1>Merhaba!</h1>
          <p>Aşağıdaki linke tıklayarak Tabula Notlar'a kaydolabilirsin.</p>
          <a style="margin-top: 24px; font-size: large">${inviteLink}</a>
      </div>
      `,
    };
  }

  if (type === "request") {
    mail = {
      to: process.env.EMAIL_USER!,
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
  }

  if (type === "bug") {
    mail = {
      to: process.env.EMAIL_USER!,
      subject: `Tabula Notlar Hata Bildirimi: ${email}`,
      text: `Hata: ${token}`,
      html: `
      <div style="margin-top: 24px">
          <h1>Merhaba!</h1>
          <p>Aşağıdaki hata Tabula Notlar'a bildirilmiştir.</p>
          <p style="margin-top: 24px;">Konu:</p>
          <p style="border: 1px solid red; border-radius: 2px; padding-block: 8px; padding-inline: 4px; font-size: large">${content}</p>
          <p >Açıklama:</p>
          <p style="border: 1px solid red; border-radius: 2px; padding-block: 8px; padding-inline: 4px; font-size: large">${token}</p>
      </div>
    `,
    };
  }

  var mailOptions = {
    from: process.env.EMAIL_FROM,
    to: mail.to,
    subject: mail.subject,
    text: mail.text,
    html: mail.html,
  };

  transporter.sendMail(mailOptions, function (error: Error, info: any) {
    if (error) {
      throw new Error(error.message);
    } else {
      return true;
    }
  });
};
