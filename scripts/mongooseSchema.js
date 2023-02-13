import mongoose from "mongoose";


const UserJWT= new mongoose.Schema({
  username:{ type: String, required: true },
  password:{ type: String, required: true },
  email:{ type: String, required: true },
  firstName:{ type: String, required: true } ,
  lastName:{ type: String, required: true } ,

})

export default UserJWT

// let User = mongoose.model("usuario", {
//   username: String,
//   password: String,
//   email: String,
//   firstName: String,
//   lastName: String,
// });

// export default User;

// import mongoose from "mongoose";
// import config from "../src/config.js";

// mongoose.connect(config.mongodb.cnxStr, config.mongodb.options);

// const UserSchema = {
//   username: String,
//   password: String,
//   email: String,
//   firstName: String,
//   lastName: String,
// };

// const User = mongoose.model("usuario", UserSchema);
// export default User;


// class UsuariosMongoDb {
//   constructor(nombreColeccion, esquema) {
//     this.coleccion = UserModel;
//   }
// }

// let User = new UsuariosMongoDb("usuarios",UserSchema)












