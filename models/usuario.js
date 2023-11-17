const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
    email: String,
    nombre: String, 
});

const usuarioModel = mongoose.model("Usuario", usuarioSchema);
module.exports = usuarioModel;