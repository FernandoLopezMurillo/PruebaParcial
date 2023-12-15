const Evento = require("../models/evento");
const colors = require("picocolors");



const getAllEventos = async (req, res) => {
  try {
    const evento = await Evento.find();
    if (!evento || evento.length === 0) {
      console.log(colors.yellow("No se encontraron eventos"));
      return res.status(404).json({ error: "No se encontraron eventos" });
    }
    res.json(evento);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los eventos" });
  }
};

const getEventos = async (req, res) => {
  const id = req.params.id;
  try {
    const evento = await Evento.findById(id);
    if (!evento) {
      console.log(colors.yellow("No se encontró el evento"));
      return res.status(404).json({ error: "No se encontró el evento" });
    }
    console.log(colors.blue("Se ha obtenido el evento " + evento.nombre ));
    res.json(evento);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el evento" });
  }
};

const createEvento = async (req, res) => {
  try {
    const evento = req.body;
      const eventoExistente = await Evento.findOne({
        nombre: evento.nombre,
        organizador: evento.organizador
      });

      if (eventoExistente) {
        console.log(colors.yellow(`El evento ya existe: ${eventoExistente.nombre}`));
        res.status(201).send("Los eventos ya estaban en la base de datos");
      } else {
        const nuevoEvento = await Evento.create(evento);
        console.log(colors.blue(`Nuevo evento creado: ${nuevoEvento}`));
        res.status(201).json({ nuevoEvento });
      }
    
  } catch (error) {
    res.status(500).json({ error: "Error al crear los eventos" });
  }
};

const updateEvento = async (req, res) => {
  const id = req.params.id;
  const datosActualizar = req.body;

  try {
    const product = await Evento.findById(id);
    if(!product){
      console.log(colors.yellow("No se encontró el evento para actualizarlo"));
      return res.status(404).json({ error: "Evento no encontrado" });
    }else{
      const evento = await Evento.findByIdAndUpdate(id, datosActualizar, {
        new: true,
      });
      console.log(colors.blue("Evento actualizado " + evento.nombre));
      res.status(200).json({ mensaje: "Evento actualizado", evento });
    }
  
  } catch (error) {
    res.status(500).json({
      error: "Error al actualizar el evento. Error msg: " + error.message,
    });
  }
};

const deleteEvento = async (req, res) => {
  const id = req.params.id;
  try {
    const evento = await Evento.findById(id);

    if (!evento) {
      console.log(colors.yellow("No se encontró el evento para borrarlo"));
      return res.status(404).json({ error: "Evento no encontrado" });
    }else{
      await Evento.findByIdAndDelete(id);
      res.status(204).send();
    }
  } catch (error) {
    res.status(500).json({ error: "Error al intentar borrar el evento" });
  }
};


module.exports = {
    getAllEventos,
    getEventos,
    createEvento,
    updateEvento,
    deleteEvento,
};