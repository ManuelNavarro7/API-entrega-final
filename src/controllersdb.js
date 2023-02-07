import mongoose from "mongoose";

let baseDeDatosConectada = false;

function ConectToDb() {
  mongoose.connect(
    "mongodb+srv://Manuel:Coder32065@cluster0.i1f4ini.mongodb.net/ecommerce",

    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
      if (!err) {
        baseDeDatosConectada = true;
      }
    }
  );
  console.log("Base de datos para usuarios conectada");
}

export default ConectToDb;
