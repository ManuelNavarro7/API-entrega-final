import ContenedorMongoDb from "../../contenedores/ContenedorMongoDb.js";
import { FacturacionSchema } from "../../../schemaMongoDb/schema.js";
import config from "../../config.js";
import mongoose from "mongoose";

let facturacionMongoDao = new ContenedorMongoDb("facturacion",  FacturacionSchema);

class FacturacionMongoDaoDb extends ContenedorMongoDb {
    constructor() {
      super("facturacion", FacturacionSchema);
    }

    async init() {
        await mongoose.connect(config.mongodb.cnxStr, config.mongodb.options);
        console.log("facturacion conect -> listo");
      }

    async guardarFacturacion(nuevoElem){
        this.init();
        let insertP = await facturacionMongoDao.guardarFacturacion(nuevoElem);

        return insertP

    }
 

}

export default FacturacionMongoDaoDb;