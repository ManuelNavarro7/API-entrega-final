import ContenedorMongoDb from "../../contenedores/ContenedorMongoDb.js";
import { ProductosSchema } from "../../../schemaMongoDb/schema.js";
import config from "../../config.js";
import mongoose from "mongoose";

let TestMongoDao = new ContenedorMongoDb("productos ", ProductosSchema);
class ProductosDaoMongoDb extends ContenedorMongoDb {
  constructor() {
    super("productos", ProductosSchema);
  }
  async init() {
    await mongoose.connect(config.mongodb.cnxStr, config.mongodb.options);
    // console.log("personas dao en mongodb -> listo");
  }

  async getAll() {
    this.init();
    let p = await TestMongoDao.listarAll();
    // console.log(p);
    return p;
  }
  async listarId(id) {
    this.init();
    // console.log("hola");
    let Idproducts = await TestMongoDao.listar(id);
    // console.log(Idproducts);
    return Idproducts;
  }
  async guardar(nuevoElem) {
    this.init();
    let elementoPasado = JSON.stringify(nuevoElem);
    // console.log(`nuevo elemento pasado ${elementoPasado}`);
    let insertP = await TestMongoDao.guardar(nuevoElem);

    return insertP;

    //console.log(insertP);
  }
  
  async borrar(id) {
    this.init();
    let borrarPorId = TestMongoDao.borrar(id);
    
    return borrarPorId;
  }

  async borrarAll() {
    let borrarPorAll = TestMongoDao.borrarAll();
    return borrarPorAll;
  }
}

export default ProductosDaoMongoDb;
