import mongoose from "mongoose";
import config from "../config.js";

await mongoose.connect(config.mongodb.cnxStr, config.mongodb.options);

class ContenedorMongoDb {
  constructor(nombreColeccion, esquema) {
    this.coleccion = mongoose.model(nombreColeccion, esquema);
  }

  async listar(id) {
    let productoPorId = await this.coleccion.find({ _id: id });

// console.log(productoPorId)
    return productoPorId;
  }

async CartUser(user){

 
    let userCarts =await this.coleccion.find({ user: user });
   
    return userCarts
}

  async listarAll() {
   
    let p = await this.coleccion.find({});

    return p;
  }

  async guardar(nuevoElem) {
    let elementoPasado = JSON.stringify(nuevoElem);
   
    let insertP = this.coleccion.insertMany([nuevoElem]);

    return insertP;

   
  }

  async guardarConUsuario(nuevoElem) {
    let elementoPasado = JSON.stringify(nuevoElem);
    
    let insertP = this.coleccion.insertMany([nuevoElem]);

    return insertP;

   
  }

  async guardarProductoenCarrito(idCarrito, idproducto,producto) {
    
    

    let beta = producto
    
    
    let findProdenCart4 = await this.coleccion.findOne({_id: idCarrito}, {productos: {$elemMatch: {title: beta[0].title}}});


    let findProdenCart5 = await this.coleccion.findOne({_id: idCarrito}, {productos: {$elemMatch: {}}});
    
    let StrFindProdCart = JSON.stringify(findProdenCart5.productos)

   
   if(findProdenCart4.productos.length ==0){

    
    let CarritoFind1 = await this.coleccion.updateOne(
      { _id: idCarrito, "productos._id": { $ne: producto._id } },
      { $push: { productos: producto} }
    );
    // let CarritoFind1 = await this.coleccion.updateOne(
    //   { _id: idCarrito },
    //   { $push: { productos: producto} }
    // );
  let findProdenCart6 = await this.coleccion.findOne({_id: idCarrito}, {productos: {$elemMatch: {_id: beta[0]._id}}});
 
  let Cpedida= findProdenCart6.productos[0].cantidadPedida
  if(findProdenCart6.productos[0].cantidadPedida==0){
    let CarritoFind3 = await this.coleccion.updateOne({_id:idCarrito, "productos._id": beta[0]._id }, { $set: { "productos.$.cantidadPedida": 1}}, )
  }else{
    let CarritoFind3 = await this.coleccion.updateOne({_id:idCarrito, "productos._id": beta[0]._id }, { $set: { "productos.$.cantidadPedida": Cpedida+1}}, )
  }
 
  
 
   }else{
    
    let Cpedida= findProdenCart4.productos[0].cantidadPedida

    let CarritoFind3 = await this.coleccion.updateOne({_id: idCarrito, "productos.title": beta[0].title}, {$set: {"productos.$.cantidadPedida": Cpedida+1}})


   }

   
  }
  async CargarProdCarritoStore(idCarrito, idproducto,producto) {
    

    let beta = producto
    
    
    let findProdenCart4 = await this.coleccion.findOne({_id: idCarrito}, {productos: {$elemMatch: {title: beta[0].title}}});
   


    let Cpedida= findProdenCart4.productos[0].cantidadPedida

    let CarritoFind3 = await this.coleccion.updateOne({_id: idCarrito, "productos.title": beta[0].title}, {$set: {"productos.$.cantidadPedida": Cpedida+1}})

    
   

   
  }
  async BorrarProdStore(idCarrito, idproducto,producto) {
    

    let beta = producto
    
    
    let findProdenCart4 = await this.coleccion.findOne({_id: idCarrito}, {productos: {$elemMatch: {title: beta[0].title}}});
    


    let Cpedida= findProdenCart4.productos[0].cantidadPedida
    

    let CarritoFind3 = await this.coleccion.updateOne({_id: idCarrito, "productos.title": beta[0].title}, {$set: {"productos.$.cantidadPedida": Cpedida-1}})

    let findProdenCart5 = await this.coleccion.findOne({_id: idCarrito}, {productos: {$elemMatch: {title: beta[0].title}}});
    let Cpedida5= findProdenCart5.productos[0].cantidadPedida
    
    if(Cpedida5 ==0){
      let borrarPorId =await this.coleccion.updateOne({_id: idCarrito}, {$pull: {productos: {title: beta[0].title}}});
      
    }
   
   

   
  }


  //antes estaba actualizar por si para algo

  async guardarFacturacion(nuevoElem) {
   
  let insertFactura = await this.coleccion.insertMany([nuevoElem])

  return insertFactura

  }
  async guardarMensaje(nuevoElem) {
   
    let insertFactura = await this.coleccion.insertMany([nuevoElem])
  
    return insertFactura
  
    }

    async leerMensajes() {
   
      let mensajes= await this.coleccion.find({})
    
      return mensajes
    
      }
  

  async borrar(id,productoid) {
   
    
    let deleteProdenCart5 = await this.coleccion.findOneAndDelete({_id: id}, {$pull: {productos: {_id: productoid}}});
   
    if (deleteProdenCart5 && deleteProdenCart5.value && deleteProdenCart5.value.productos) {
      if (deleteProdenCart5.value.productos.length === 0) {
        this.coleccion.findOneAndUpdate({_id: id}, {productos: []});
      }
   }
   
   

    return deleteProdenCart5;
  }

  async borrarAll() {
    let borrarPorAll = this.coleccion.deleteMany({});
    return borrarPorAll;
  }
}

export default ContenedorMongoDb;
