import autocannon from "autocannon";
// const { PassThrough } = require("stream"); //para la salida stream
import { PassThrough } from "stream";

function run(url) {
  const buf = [];
  const outputStream = new PassThrough();

  const inst = autocannon({
    url,
    connections: 10,
    duration: 20,
  });

  //Para el track de la prueba de carga
  autocannon.track(inst, { outputStream });
  outputStream.on("data", (data) => buf.push(data));
  inst.on("done", () => {
    process.stdout.write(Buffer.concat(buf));
  });
}

run("http://localhost:8080/api/productos");
