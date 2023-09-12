import nodemailer from "nodemailer";
import dotenv from "dotenv";


dotenv.config();

export const recoveryPassword = async (req, res) => {
    try{
        sendEmail(req.body)
      .then((response) => res.send(response.message))
      .catch((error) => res.status(500).send(error.message));
    }catch{

    }
}


function sendEmail({ recipient_email, OTP }) {
    return new Promise((resolve, reject) => {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: {
          user: process.env.MY_EMAIL,
          pass: process.env.MY_PASSWORD
        },
      });
  
      const mail_configs = {
        from: process.env.MY_EMAIL,
        to: recipient_email,
        subject: "RECUPERACIÓN DE CONTRASEÑA CODEARK35 ",
        html: `<!DOCTYPE html>
  <html lang="es" >
  <head>
    <meta charset="UTF-8">
    <title>Password Recovery - OTP</title>
    
  
  </head>
  <body>
  <!-- partial:index.partial.html -->
  <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
    <div style="margin:50px auto;width:70%;padding:20px 0">
      <div style="border-bottom:1px solid #eee">
        <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">CodeArk35</a>
      </div>
      <p style="font-size:1.1em">Hola,</p>
      <p>Gracias por elegir CodeArk35. Utilice el siguiente OTP para completar su procedimiento de recuperación de contraseña. La OTP es válida por 5 minutos.</p>
      <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${OTP}</h2>
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
  </html>`,
      };
      transporter.sendMail(mail_configs, function (error, info) {
        if (error) {
          console.log(error);
          return reject({ message: `An error has occured` });
        }
        return resolve({ message: "Email sent succesfuly" });
      });
    });
  }
  

  
 