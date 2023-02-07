import express from "express";
import cors from "cors"
import productosRouter from "./Routes/routesProductos.js";
import loginRouter from "./Routes/routesLogin.js";
import carritosRouter from "./Routes/routesCarritos.js";
import facturacionRouter from "./Routes/routesFacturacion.js"
import cookiesession from "cookie-session"
//IO
import { Server as HttpServer } from "http";
import { Server as Socket } from "socket.io";
import {guardarMensaje, leerMensajes} from "../src/controller/mensajesController.js"

//Config
import config from "./config.js";



//-------------------------- DOT ENV


//Session

import session from "express-session";

//Passport

import passport from "passport";

//Dot env files selection
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { memoryUsage } from "process";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function SwitchPath() {
  let ProcessPath = process.env.MODO;

  switch (ProcessPath) {
    case undefined:
      return path.resolve(__dirname, "develope.env");
    case "develope":
      return path.resolve(__dirname, "develope.env");
    case "production":
      return path.resolve(__dirname, "prod.env");
    case "fork":
      return path.resolve(__dirname, "develope.env");
    case "cluster":
      return path.resolve(__dirname, "prod.env");
  }
}

dotenv.config({
  path: SwitchPath(),
});



//------------------------------------------------------------------------
// instancio servidor

//Passport initialize & User for
const app = express();
const httpServer = new HttpServer(app);
const io = new Socket(httpServer,{
  cors:{
    origin:"http://localhost:3000"
  }
});

app.use(cors( {
  credentials: true,
  origin: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


const TIEMPO_EXPIRACION = 100000;

app.use(
  cookiesession({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      maxAge: TIEMPO_EXPIRACION,
    },
  })
);

app.use(passport.initialize());

//Para inicializar session con la utilidad de passport
app.use(passport.session());

app.use("/api/session", loginRouter);

app.use("/api/productos", productosRouter);

app.use("/api/carritos", carritosRouter);

app.use("/api/facturacion", facturacionRouter);






io.on("connection",async (socket)=> {
  console.log("Un cliente se ha conectado");

  
  
  async function Main() {
    const leerMensajes1 = await leerMensajes()
 
  
  io.sockets.emit("messages", leerMensajes1)
 
  socket.on("miMensaje", async (data) => {
  console.log(data)
  const mensajesApi = await guardarMensaje(data)

  const leerMensajes1 = await leerMensajes()
 
  
  io.sockets.emit("messages", leerMensajes1)
  
  socket.emit("todosLosMsgs",leerMensajes1)
  
});

  }
  Main();

})



export default httpServer;
