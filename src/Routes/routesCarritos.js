import { Router } from "express";
import checkAuthentication from "../middleware.js";


import {
  getAll,
  getID,
  listarPorUser,
  listarUsuarioCarrito,
  AgregarCarrito,
  CargarProdCarrito,
  CargarProdCarritoStore,
  FacturacionCarrito,
 
  BorrarProdStore,
  BorrarPorIdProdEnCarrito,
  BorrarPorId,
  BorrarTodo,
} from "../controller/CarritosController.js";

// const carritosRouter = new Router();
const carritosRouter = new Router();

carritosRouter.get("/", checkAuthentication, getAll);
carritosRouter.get("/userid", checkAuthentication, listarPorUser);
carritosRouter.get("/:id/productos", listarUsuarioCarrito);
carritosRouter.post("/agregarcarrito", checkAuthentication, AgregarCarrito);
carritosRouter.post("/:id/productos", CargarProdCarrito);
carritosRouter.post("/:id/productos/cart", CargarProdCarritoStore);
carritosRouter.post("/:id/facturacion", checkAuthentication, FacturacionCarrito);

carritosRouter.delete("/:id/productos/cart/:idProd", BorrarProdStore);
carritosRouter.delete("/:id/productos/:idProd", BorrarPorIdProdEnCarrito);
carritosRouter.delete("/:id", BorrarPorId);
carritosRouter.delete("/", BorrarTodo);

export default carritosRouter;
