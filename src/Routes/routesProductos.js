import { Router } from "express";
import checkAuthentication from "../middleware.js";

import {
  getAll,
  listarId,
  AgregarProducto,
  RutaNoImplementada,
  BorrarPorId,
  BorrarTodo,
} from "../controller/ProductosController.js";

// const carritosRouter = new Router();
const productosRouter = new Router();

productosRouter.get("/", getAll);
productosRouter.get("/:id", listarId);
productosRouter.post("/", AgregarProducto);
productosRouter.put("/:id", RutaNoImplementada);
productosRouter.delete("/:id", BorrarPorId);
productosRouter.delete("/", BorrarTodo);

export default productosRouter;
