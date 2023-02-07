import logger from "../logger/logger.js";
//Node Mailer

import { createTransport } from "nodemailer";
const HOST = "manuel.navarro.work@gmail.com";

const transporter = createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: HOST,
    pass: "lpkmbujmidfredfu",
  },
});
async function getAll(req, res) {
  const { user } = req;

  try {
    const mailOptions = {
      from: "Servidor Node.js",
      to: "manuel.mnavarro@hotmail.com",
      subject: "Usuario creado con exito",
      html: `
          <h1 style="color:blue"> Nuevo usuario creado</h1>
          <h2> Nombre: ${user.username} </h2>
          <h2> Mail: ${user.email} </h2>
          
          `,
      attachments: [],
    };
    const info = await transporter.sendMail(mailOptions);
  } catch (error) {}
  logger.info(user);
  res.send({ message: "You have sign up" });
}

export { getAll };
