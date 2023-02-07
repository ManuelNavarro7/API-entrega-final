let productosDao;
let carritosDao;
let productosDaoM;
let carritosDaoM;
let facturacionDaoM;
let mensajeDaoM;
let MemoryDataBase = "mongodb";

switch (MemoryDataBase) {
  
  case "mongodb":
    const { default: ProductosDaoMongoDb } = await import(
      "../daos/productos/ProductosDaoMongoDb.js"
    );
    const { default: CarritosDaoMongoDb } = await import(
      "../daos/carritos/CarritoDaoMongoDb.js"
    );
    const { default: FacturacionDaoMongoDb } = await import(
      "../daos/facturacion/FacturacionDaoMongoDb.js"
    );
    const { default: MensajesMongoDaoDb } = await import(
      "../daos/mensajes/MensajesDaoMongoDb.js"
    );
    productosDaoM = new ProductosDaoMongoDb();
    carritosDaoM = new CarritosDaoMongoDb();
    facturacionDaoM = new  FacturacionDaoMongoDb();
    mensajeDaoM = new  MensajesMongoDaoDb();
    break;
  
}

export { productosDao, carritosDao, productosDaoM, carritosDaoM,facturacionDaoM,mensajeDaoM };
