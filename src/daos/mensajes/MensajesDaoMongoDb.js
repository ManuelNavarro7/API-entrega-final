import ContenedorMongoDb from "../../contenedores/ContenedorMongoDb.js";
import { MensajeSchema} from "../../../schemaMongoDb/schema.js";
import config from "../../config.js";
import mongoose from "mongoose";

let mensajesMongoDao = new ContenedorMongoDb("mensajes",  MensajeSchema);

class MensajesMongoDaoDb extends ContenedorMongoDb {
    constructor() {
      super("mensajes", MensajeSchema);
    }

    async init() {
        await mongoose.connect(config.mongodb.cnxStr, config.mongodb.options);
        console.log("facturacion conect -> listo");
      }

    async guardarMensajes(nuevoElem){
        // this.init();

       
        let insertP = await  mensajesMongoDao.guardarMensaje(nuevoElem);

        return insertP

    }
    async leerMensajes(){
        // this.init();

        
        let insertP = await  mensajesMongoDao.leerMensajes();

        return insertP

    }
   
 

}

export default MensajesMongoDaoDb;