import logger from "./logger/logger.js";

export default function checkAuthentication(req, res, next) {
  console.log("kkkkkkkkkkk"+req.isAuthenticated() );
  if (req.isAuthenticated()==true) {

    console.log("Horacioooooooooo")
    next();
  } else {
    logger.error("Parámetros incorrectos");
    res.send({ message: "Not authenticated" });
  }
}
