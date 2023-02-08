import mongoose from "mongoose";

let User = mongoose.model("usuarios", {
  username: String,
  password: String,
  email: String,
  firstName: String,
  lastName: String,
});

export default User;
