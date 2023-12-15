const mongoose = require("mongoose");

const eventoSchema = new mongoose.Schema({
    
    nombre: {type: String, length: 50 },
    inicio: { type: Date},
    direccion: String,
    organizador: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    } ,
    fotos: {
        type: [String],
        default: [],
    },
    
});
  
const eventoModel = mongoose.model("Evento", eventoSchema);
module.exports = eventoModel;