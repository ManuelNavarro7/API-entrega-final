import logger from "./logger/logger.js";
import jwt from 'jsonwebtoken'
const PRIVET_KEY = "myprivatekey";
export default function checkAuthentication(req, res, next) {
  
  const authHeader = req.headers.authorization;
  //lo manda el cliente en el header
  if (!authHeader) {
    return res.status(401).json({
      error: "not authenticates",
    });
  }
  const token = authHeader.split(" ")[1];
  //el split es para sacar el que viene del header el Beader que no se necesita, y obtengo el elemento que esta en la primer posicion.

  if (!token) {
    return res.status(401).json({
      error: "se requiere autenticacion",
      detalle: "formato de token no valido",
    });
  }
  jwt.verify(token, PRIVET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        error: "not authorized",
      });
    }
    req.user = decoded.data;
    next();
  });
}
