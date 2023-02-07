import httpServer from "./server.js";

//Database User
import ConectToDb from "./controllersdb.js";

//Yargs

import Yargs from "yargs";

//Database User Connection

ConectToDb();

//Yargs Rules for PORT

const args = Yargs(process.argv.slice(2))
  .default({
    puerto: 8080,
    debug: false,
  })
  .alias({
    p: "port",
    d: "debug",
  }).argv;

//console.log(args.p);

let PORT = args.p;

if (!args.p) {
  PORT = args.puerto;
}

//Server Connection

const server = httpServer.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));
