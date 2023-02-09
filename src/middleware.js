import logger from "./logger/logger.js";

export default function checkAuthentication(req, res, next) {
  
  if (req.isAuthenticated()) {

    console.log(req.isAuthenticated())
    next();
  }else {
    logger.error("Parámetros incorrectos");
    res.send({ message: "Not authenticated" });
  }
}
