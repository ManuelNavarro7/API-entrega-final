import { facturacionDaoM } from "../daos/index.js";



async function guardarFacturacion(req, res) {

   

    let nuevoElem={
        user:req.body.user,
        productos:req.body.productos,
        idCart:req.body.idCart,
        total:req.body.total,
        date:req.body.date,
    }

    let AllcarritosFacturacion = await facturacionDaoM.guardarFacturacion(nuevoElem);
  
    res.send(AllcarritosFacturacion);
  }

  export {
    guardarFacturacion
  };
  