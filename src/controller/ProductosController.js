// import ContenedorMongoDb from "../contenedores/ContenedorMongoDb.js";
// import { ProductosSchema } from "../../schemaMongoDb/schema.js";
import { productosDaoM } from "../daos/index.js";

// const productosAPiM = new ContenedorMongoDb("productos ", ProductosSchema);

async function getAll(req, res) {
  let productos = await productosDaoM.getAll();
  // console.log(productos)
  res.send({ productos: productos });
}
async function listarId(req, res) {
  const { id } = req.params;

  //Rutas MariaDB
  //let IdproductsMariadb = await productosApiMDB.listar(id);

  //Rutas Squlite
  //let IdproductsSqlite = await productosApiSQ.listar(id);

  //console.log(JSON.stringify(IdproductsSqlite));

  //Ruta Mongodb
  let Idproducts = await productosDaoM.listarId(id);
  res.send(`El producto seleccionado es ${Idproducts}`);
}
async function AgregarProducto(req, res) {
  let productoAgregado = req.body;

  // //Ruta MariaDB
  // let productoAgregadoMariadb = await productosApiMDB.guardar(productoAgregado);

  // //console.log(productoAgregadoMariadb);

  // //Rutas Squlite
  // let productoAgregadoSqlite = await productosApiSQ.guardar(productoAgregado);

  //console.log(productoAgregadoSqlite);

  //Rutas MongoDb

  let insertProducto = await productosDaoM.guardar(productoAgregado);
  let Allproducts = await productosDaoM.getAll();

  res.send({ productoAgregado: Allproducts });
}
async function RutaNoImplementada(req, res) {
  res.error("Error 500 ruta no implementada");
}
async function BorrarPorId(req, res) {
  const { id } = req.params;

  // //Rutas MariaDB
  // let IdproductsMariadb = await productosApiMDB.borrar(id);

  // //Ruta Sqlite

  // let IdproductsSqulite = await productosApiSQ.borrar(id);
  // //Se borra correctamente el producto

  // //Ruta MongoDb
  let Idproducts = await productosDaoM.borrar(id);

  res.send(`Se borro el producto`);
}
async function BorrarTodo(req, res) {
  // let borraAllProductosMariadb = await productosApiMDB.borrarAll();
  // let borraAllProductosSqlite = await productosApiSQ.borrarAll();
  let borraAllProductos = await productosAPiM.borrarAll();

  res.send(`El borro todos los productos`);
}
export {
  getAll,
  listarId,
  AgregarProducto,
  RutaNoImplementada,
  BorrarPorId,
  BorrarTodo,
};
