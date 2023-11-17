const mongoose = require("mongoose");

const contactoSchema = new mongoose.Schema({
    contacto1: { type: mongoose.Schema.Types.ObjectId, ref: "ContactoA", },
    contacto2: { type: mongoose.Schema.Types.ObjectId, ref: "ContactoB", },
});

const contactoModel = mongoose.model("Contacto", contactoSchema);
module.exports = contactoModel;