
import mongoose from "mongoose";
import config from "../src/config.js";

mongoose.connect(config.mongodb.cnxStr, config.mongodb.options);

const UserSchema = {
  username: String,
  password: String,
  email: String,
  firstName: String,
  lastName: String,
};

const User = mongoose.model("usuarios", UserSchema);

// class UsuariosMongoDb {
//   constructor(nombreColeccion, esquema) {
//     this.coleccion = UserModel;
//   }
// }

// let User = new UsuariosMongoDb("usuarios",UserSchema)
export default User;











