import nodemailer from "nodemailer";
import User from "../models/userModel.js";
import dotenv from "dotenv";

dotenv.config();

function createTransport() {
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.MY_PASSWORD
    },
  });
}



// HTML Mail Template
function mailRecoveryHTMLPassword(name, uuid) {
  return `<!DOCTYPE html>
  <html lang="es" >
  <head>
    <meta charset="UTF-8">
    <title>Password Recovery - OTP</title>
  </head>
  <body>
  <!-- partial:index.partial.html -->
  <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
    <div style="margin:50px auto;width:90%;padding:10px 0">
      <div style="border-bottom:1px solid #eee">
        <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">CodeArk35</a>
      </div>
      <p style="font-size:1.1em">Hola, ${name}</p>
      <p>Para restablecer su contraseña haga clic en el siguiente enlace: http://localhost:5173/reset-password/${uuid} para completar su procedimiento de recuperación de contraseña.</p>
      <p>Si no solicitó un restablecimiento de contraseña, puede ignorar este correo electrónico de forma segura.</p>
      <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;"></h2>
      <p style="font-size:0.9em;">Saludos,<br />CodeArk35</p>
      <hr style="border:none;border-top:1px solid #eee" />
      <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
        <p>CodeArk35 Inc</p>
        <p>6000 Encarnación</p>
        <p>Paraguay</p>
      </div>
    </div>
  </div>
  <!-- partial -->
    
  </body>
  </html>`
}
// Send email
function sendEmailRecoveryPassword(recipient_email, name, uuid) {
  return new Promise((resolve, reject) => {
    const transporter = createTransport();
    const mail_configs = {
      from: process.env.MY_EMAIL,
      to: recipient_email,
      subject: "Recuperación de contraseña",
      html: mailRecoveryHTMLPassword(name, uuid),
    };
    transporter.sendMail(mail_configs, (error, info) => {
      if (error) {
        return reject({ msg: `An error has occured: ${error.toString()}` });
      }
      return resolve({ msg: "El email fue enviado correctamente" });
    });
  });
}

// Recovery password
export const recoveryPassword = async (req, res) => {
  try {
    const { recipient_email } = req.body;
    const { name, uuid } = await User.findOne({
      attributes: ['id', 'uuid', 'name', 'email'],
      where: {
        email: recipient_email
      }
    });
    sendEmailRecoveryPassword(recipient_email, name, uuid)
      .then((response) => res.status(210).send(response))
      .catch((error) => {
        console.error(error);
        res.status(500).send(error)
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}