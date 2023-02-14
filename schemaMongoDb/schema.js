import mongoose from "mongoose";

export const ProductosSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  thumbnail: { type: String, required: true },
  cantidadPedida:{type:Number},
});

export const CarritoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  productos: { type: Array },
  user: { type: String },
});

export const FacturacionSchema = new mongoose.Schema({
  user: { type: String, required: true },
  productos: { type: Array },
  idCart: { type: String },
  total:{type:Number},
  date:{type:String}
});

export const MensajeSchema = new mongoose.Schema({
  user: { type: String, required: true },
  mensaje: { type: String}
});

