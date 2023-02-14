// import ContenedorMongoDb from "../contenedores/ContenedorMongoDb.js";
// import { CarritoSchema } from "../../schemaMongoDb/schema.js";
import { carritosDaoM } from "../daos/index.js";
import { productosDaoM } from "../daos/index.js";
// const carritosAPiM = new ContenedorMongoDb("carritos", CarritoSchema);
import { createTransport } from "nodemailer";
const HOST = "manuel.navarro.work@gmail.com";

const transporter = createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: HOST,
    pass: "lpkmbujmidfredfu",
  },
});

async function getAll(req, res) {
  let Allcarritos = await carritosDaoM.getAll();

  res.send({ Carritos: Allcarritos });
}
async function getID(req, res) {
 
  let { user } = req;

 let idUser =user._id

 
 let carritosConprod = await carritosDaoM.listar(String(idUser));



 if(carritosConprod.length === 0){
  res.send({message:"Ud no tiene ningun carrito creado",userName:user.username})
 }else{
  res.send({message:"Ud esta aqui"})
 
 }
 
}

async function listarPorUser(req, res) {
 
  let { user } = req;

  
  

  let userName= user.username

  
  



  
 
 
 let carritosConprod = await carritosDaoM.listarPorUser(userName);



 res.send({user:userName, carritos:carritosConprod})
 
}

async function listarUsuarioCarrito(req, res) {
  const { id } = req.params;
  const { user } = req;
  let carritosConprod = await carritosDaoM.listar(id);
  carritosConprod.forEach(function (elem) {
    
    if (user.username == elem.user) {
      
      res.send(carritosConprod);
    } else {
      res.send({ message: "404 not found error de usuario y carrito" });
    }
  });
}
async function AgregarCarrito(req, res) {
  const { user } = req;
 
  let carritoNuevo = { title: "carrito", productos: [], user: user.username };
  let insertCarrito = await carritosDaoM.guardarConUsuario(carritoNuevo);
 
  res.send({ carrito: insertCarrito });
}
async function CargarProdCarritoStore(req, res) {
  const { id } = req.params;
  
  let idproducto = req.body.id;

  console.log(id)
  console.log(idproducto)
  let productoXID = await productosDaoM.listarId(idproducto);
 
  const IdString = JSON.stringify( idproducto);

  let guardarProductoenCarritoXId = await carritosDaoM.guardarProductoenCarrito(
    id,
    IdString,
    productoXID
  );
  let carritosConprod = await carritosDaoM.listar(id);
 

  res.send(carritosConprod);
}




async function CargarProdCarrito(req, res) {
  const { id } = req.params;
  

  

  let idproducto = req.body.id;
 
  

  let productoXID = await productosDaoM.listarId(idproducto);

  const IdString = JSON.stringify( idproducto);

  let guardarProductoenCarritoXId = await carritosDaoM.guardarProductoenCarrito(
    id,
    IdString,
    productoXID
  );
  let carritosConprod = await carritosDaoM.listar(id);


  res.send(carritosConprod);
}
async function BorrarProdStore(req, res) {
  const { id } = req.params;
  const { idProd } = req.params;
  
  

  let productoXID = await productosDaoM.listarId(idProd);
  

  let guardarProductoenCarritoXId = await carritosDaoM.BorrarProdStore(
    id,
    idProd,
    productoXID
  );
  let carritosConprod = await carritosDaoM.listar(id);
  

  res.send(carritosConprod);
}

async function FacturacionCarrito(req, res) {

  

  try{
    const { id } = req.params;
    let cart = req.body;
  

    const mailOptions = {
      from: "Servidor Node.js",
      to: "manuel.mnavarro@hotmail.com",
      subject: "Usuario creado con exito",
      html: `
        <h1 style="color:blue"> Nuevo usuario creado</h1>
        <h2> Nombre: ${cart.user} </h2>
        <h3>Cart ID:${cart.idCart}</h3>
        <h3>Factura ID:${cart.idFactura}</h3>
        
        <h4>${cart.date}</h4>
        ${cart.productos.map(product => `<h2> Producto: ${product.title} </h2><h2> Precio: ${product.price} </h2><h2> Cantidad: ${product.cantidadPedida} </h2>`).join('')}
        <h3>Total de facturacion ${cart.total}</h3>
      
        
        `,
      attachments: [],
    };

    const info = await transporter.sendMail(mailOptions);

   

    let ProdMap =await cart.productos.forEach(async(producto)=>{
      let BorrarProdEncartFact= await carritosDaoM.borrar(id,producto._id)
      })
    
    

  
  res.status(200).send("Status Working")
  }catch(error){
    console.log(error)
    res.status(404).send("Status Not Working")
  }


}







async function BorrarPorIdProdEnCarrito(req, res) {
  const { id } = req.params;
  
  

  let idproducto = req.body.id;
 
  

  let productoXID = await productosDaoM.listarId(idproducto);
  

  let guardarProductoenCarritoXId = await carritosDaoM.BorrarPorIdProdEnCarrito(
    id,
    idproducto,
    productoXID
  );
  let carritosConprod = await carritosDaoM.listar(id);
  

  res.send(carritosConprod);
}

async function BorrarPorId(req, res) {
  const { id } = req.params;

  let Idproducts = await carritosDaoM.borrar(id);
  res.send(`El carrito borrado ${JSON.stringify(Idproducts)}`);
}

async function BorrarTodo(req, res) {
  let borraAllCarritos = await carritosDaoM.borrarAll();

  res.send(`borro todos los carritos`);
}
export {
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
};
