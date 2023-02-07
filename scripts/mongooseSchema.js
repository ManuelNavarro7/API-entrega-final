import mongoose from "mongoose";

let User = mongoose.model("usuario", {
  username: String,
  password: String,
  email: String,
  firstName: String,
  lastName: String,
});

export default User;
