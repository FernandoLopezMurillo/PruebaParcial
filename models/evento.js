const mongoose = require("mongoose");

const eventoSchema = new mongoose.Schema({
    anfitrion: String,
    descripcion: {type: String, length: 50 },
    inicio: { type: Date},
    duracion: Number,
});
  
const eventoModel = mongoose.model("Evento", eventoSchema);
module.exports = eventoModel;