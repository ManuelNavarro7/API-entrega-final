import express from "express";
import { Router } from "express";
import checkAuthentication from "../middleware.js";
import { getAll } from "../controller/LoginControler.js";
import logger from "../logger/logger.js";
// Bcrypt // Tiempo de expiracion

import bCrypt from "bcrypt";
//User for User database
import User from "../../scripts/mongooseSchema.js";

//Passport


import passport from "passport";

//Strategy & Conection to database usuarios

import { Strategy as LocalStrategy } from "passport-local";
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

// permisos de administrador

//---------Authenticacion de usuario y pass-----------------------------
// const app = express();

// const TIEMPO_EXPIRACION = 60000;

// app.use(
//   session({
//     secret: "secret",
//     resave: false,
//     saveUninitialized: false,
//     rolling: true,
//     cookie: {
//       maxAge: TIEMPO_EXPIRACION,
//     },
//   })
// );

// app.use(passport.initialize());

// //Para inicializar session con la utilidad de passport
// app.use(passport.session());
//Passport work
passport.use(
  "signup",
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    (req, username, password, done) => {
      User.findOne({ username: username }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (user) {
          return done(null, false);
        }
        const newUser = {
          username: username,
          password: createHash(password),
          email: req.body.email,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
        };

        User.create(newUser, (err, userWithId) => {
          if (err) {
            return done(err);
          }
          return done(null, userWithId);
        });
      });
    }
  )
);

// passport.use(
//   "login",
//   new LocalStrategy((username, password, done) => {
    
//     User.findOne({ username }, (err, user) => {
//       console.log("%%%%%%%%"+user);
//       if (err) {
//         return done(err);
//       }
//       if (!user) {
        
//         return done(null, false);
//       }
//       if (!user) {
//         return done(null, false);
//       }
//       if (!isValidaPassword(user, password)) {
//         return done(null, false);
//       }

//       return done(null, user);
//     });
//   })
// );
passport.use(
  "login",
  new LocalStrategy((username, password, done) => {
    User.findOne({ username }, (err, user) => {
      console.log("%%%%%%%%"+user);
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      if (isValidaPassword(user, password)) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);

//Retornamos null porque o hay error y almacenamos el user._id para posterior por identificar a traves del user._id
//Setear valores de id a nivel de session
passport.serializeUser((user, done) => {
  done(null, user._id);
});

//Seteamos todos los parametros a nivel session y se guardan.
passport.deserializeUser((id, done) => {
  User.findById(id, done);
});

function createHash(password) {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}
function isValidaPassword(user, password) {
  console.log("&&&&&&&&&&&&&&&&&&&"+bCrypt.compareSync(password, user.password))
  return bCrypt.compareSync(password, user.password);
}
// function isValidaPassword(user, password) {

//   console.log("$$$$$$$$"+user)
//   console.log("$$$$$$$$"+password)
//   return bCrypt.compareSync(password, user.password);
// }
const loginRouter = new Router();

loginRouter.post(
  "/signup",
  passport.authenticate("signup", {
    failureRedirect: "nne",
  }),
  async (req, res) => {
    console.log(req.session)
    const {user}  = req;
    console.log(user)
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
);
loginRouter.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect:
      "https://developer.mozilla.org/es/docs/Web/CSS/transform-function/translate",
  }),
  (req, res) => {
    logger.info("authenticated");
    res.send({ message: "Is authenticated" });
  }
);

loginRouter.get("/ruta-protegida", checkAuthentication, (req, res) => {
  const { user } = req.user;
  console.log(user)
  logger.info(user);
  logger.error("Parámetros incorrectos");
  res.send("<h1>Ruta OK!</h1>");
});


loginRouter.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (!err) res.send("Logout ok!");
    else res.send({ status: "Logout ERROR", body: err });
  });
});

export default loginRouter;
