import { Router } from "express";
import checkAuthentication from "../middleware.js";
import {
    guardarFacturacion,
  } from "../controller/FacturacionController.js";



  
const facturacionRouter = new Router();

facturacionRouter.post("/", checkAuthentication,guardarFacturacion );
// facturacionRouter.get("/userid", checkAuthentication, listarPorUser);



export default facturacionRouter;