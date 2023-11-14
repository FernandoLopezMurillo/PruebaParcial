const mongoose = require("mongoose");

const productoSchema = new mongoose.Schema({
  nombre: String ,
});

const productoModel = mongoose.model("Producto", productoSchema);
module.exports = productoModel;