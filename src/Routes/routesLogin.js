import express from "express";
import { Router } from "express";
import checkAuthentication from "../middleware.js";
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken'
import logger from "../logger/logger.js";
const PRIVET_KEY = "myprivatekey";


import UserJWT from "../../scripts/mongooseSchema.js";

let jwtUsersCollection = mongoose.model('usuarios', UserJWT)

function generateToken(user) {
  const token = jwt.sign({ data: user }, PRIVET_KEY, { expiresIn: "1h" });
  return token;
}
//Node mailer

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


const loginRouter = new Router();


loginRouter.post("/signup", async (req,res)=>{
try{

    const { username, password, email,firstName,lastName } = req.body;
    // console.log(req.body)
    const yaExiste = await jwtUsersCollection.find({username:username});

    console.log(yaExiste)
    if (yaExiste.length !=0) {
      return res.json({ error: "ya existe ese usuario" });
    }
    const user = { username, password, email,firstName,lastName  };
  
    const guardarNuevo = await jwtUsersCollection.insertMany(user);
    
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

    logger.info(user);
    res.send({ message: "You have sign up" })

  }catch(error){
    return res.json({ error: "ya existe ese usuario" });
    console.log(error)
  }
  
})

loginRouter.post("/login",async (req, res) => {

  try{
    const { username, password } = req.body;

    
  // const usuario = await jwtUsersCollection.findOne({nombre:nombre, password:password},{password:false});
  const usuario = await jwtUsersCollection.findOne({$and: [{username: username}, {password: password}]}, {password: 0});



  if (!usuario) {
    return res.json({ error: "credenciales invalidas" });
  }
  // console.log(usuario )
  // const access_token = generateToken(usuario);
  const access_token = generateToken(usuario);
 
  res.json({ access_token });

  }catch(error){
    console.log(error)
  }
    // logger.error("------------Not authenticated");
    // res.send({ message: "Is authenticated" });
  }
);

loginRouter.get("/datos", checkAuthentication, async (req, res) => {

  const id = req.user._id
  console.log(id)


    const usuario = await jwtUsersCollection.find({_id:id},{password:false});
    res.json(usuario);
  
});

// loginRouter.get("/ruta-protegida", checkAuthentication, (req, res) => {
//   const { user } = req.user;
//   console.log(user)
//   logger.info(user);
//   logger.error("Parámetros incorrectos");
//   res.send("<h1>Ruta OK!</h1>");
// });

// loginRouter.get("/logout", (req, res) => {
//   req.session.destroy((err) => {
//     if (!err) res.send("Logout ok!");
//     else res.send({ status: "Logout ERROR", body: err });
//   });
// });

export default loginRouter;
