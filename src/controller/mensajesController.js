import { mensajeDaoM } from "../daos/index.js"



async function guardarMensaje(data) {

   

    // let nuevoElem={
    //     user:req.body.user,
    //     mensaje:req.body.mensaje,
        
    // }
    logger.info(data)
    let AllcarritosFacturacion = await  mensajeDaoM.guardarMensajes(data);
  
    // res.send(AllcarritosFacturacion);
    // res.send(AllcarritosFacturacion);
  }
  async function leerMensajes() {

   

    // let nuevoElem={
    //     user:req.body.user,
    //     mensaje:req.body.mensaje,
        
    // }
    
        
    let AllcarritosFacturacion2 = await  mensajeDaoM.leerMensajes();
   

    return AllcarritosFacturacion2
    // res.send(AllcarritosFacturacion);
    // res.send(AllcarritosFacturacion);
  }


  export {
    guardarMensaje,
    leerMensajes
  };
  