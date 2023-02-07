import ContenedorMongoDb from "../../contenedores/ContenedorMongoDb.js";
import { CarritoSchema } from "../../../schemaMongoDb/schema.js";
import config from "../../config.js";
import mongoose from "mongoose";

let CarritosMongoDao = new ContenedorMongoDb("carritos", CarritoSchema);

class CarritosDaoMongoDb extends ContenedorMongoDb {
  constructor() {
    super("carritos", CarritoSchema);
  }
  async init() {
    await mongoose.connect(config.mongodb.cnxStr, config.mongodb.options);
    console.log("carritos conect -> listo");
  }
  async getAll() {
    this.init();
    let p = await CarritosMongoDao.listarAll();
    // console.log(p);
    return p;
  }

  async listar(id) {
    this.init();
    let productoPorId = await CarritosMongoDao.listar(id);

    return productoPorId;
  }
  async listarPorUser(user) {
    this.init();
    // console.log(` 1-------${user}`)
    
    let userCarts = await CarritosMongoDao.CartUser(user);
    // console.log(`-------............----- ${userCarts}`)
    return userCarts;
  }


  
  async guardarConUsuario(nuevoElem) {
    this.init();
    let elementoPasado = JSON.stringify(nuevoElem);
    // console.log(`nuevo elemento pasado ${elementoPasado}`);
    let insertP = CarritosMongoDao.guardarConUsuario(nuevoElem);

    return insertP;

    //console.log(insertP);
  }
  async guardarProductoenCarrito(idCarrito, idproducto,producto) {
    this.init();
    let CarritoFind1 = await CarritosMongoDao.guardarProductoenCarrito(
      idCarrito,
      idproducto,
      producto
    );

    return CarritoFind1;
  }
  async CargarProdCarritoStore(idCarrito, idproducto,producto) {
    this.init();
    let CarritoFind1 = await CarritosMongoDao.CargarProdCarritoStore(
      idCarrito,
      idproducto,
      producto
    );

    return CarritoFind1;
  }
  
  async BorrarProdStore(idCarrito, idproducto,producto) {
    this.init();
    let CarritoFind1 = await CarritosMongoDao.BorrarProdStore(
      idCarrito,
      idproducto,
      producto
    );

    return CarritoFind1;
  }
  
  async borrarProductoDeCarrito(idCarrito, idProducto) {
    this.init();

    let CarritoFind = await CarritosMongoDao.borrarProductoDeCarrito(
      idCarrito,
      idProducto
    );
    return CarritoFind;
  }
  async borrar(id,productoid) {
    let borrarPorId = await CarritosMongoDao.borrar(id,productoid);
    //console.log(borrarPorId);
    return borrarPorId;
  }
  async borrarAll() {
    let borrarPorAll = CarritosMongoDao.borrarAll();
    return borrarPorAll;
  }
}

export default CarritosDaoMongoDb;
