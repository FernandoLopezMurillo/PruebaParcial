const Usuario = require("../models/usuario");
const colors = require("picocolors");

const getAllUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        if (!usuarios || usuarios.length === 0) {
          console.log(colors.yellow("No se encontraron usuarios"));
          return res.status(404).json({ error: "No se encontraron usuarios" });
        }
        console.log(colors.blue("Se han obtenido los usuarios"));
        res.json(usuarios);
      } catch (error) {
        res.status(500).json({ error: "Error al obtener los productos" });
      }
}

const getUsuario = async (req, res) => {
  const id = req.params.id;
  try {
    const usuario = await Usuario.findById(id);
    if (!usuario) {
      console.log(colors.yellow("No se encontró el usuario"));
      return res.status(404).json({ error: "No se encontró el usuario" });
    }
    console.log(colors.blue("Se ha obtenido el usuario " + usuario.email));
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el usuario" });
  }
};

const createUsuario = async (req, res) => {
    try {
      const usuario = req.body;
  
        // Comprobar si ya existe un producto con los mismos datos
        const usuarioExistente = await Usuario.findOne({
          email: usuario.email,
        });
  
        if (usuarioExistente) {
          // Si el producto ya existe, puedes omitirlo o manejarlo según tus necesidades
          console.log(colors.yellow(`El usuario ya existe: ${usuarioExistente.email}`));
          res.status(201).send("El usuario ya estaba en la base de datos");
        } else {
          // Si el producto no existe, créalo y agrégalo a la lista de nuevos productos
          const nuevoUsuario = await Usuario.create(usuario);
          console.log(colors.blue(`Nuevo usuario creado: ${nuevoUsuario}`));
          res.status(201).json({ nuevoUsuario });
        }
      
    } catch (error) {
      res.status(500).json({ error: "Error al crear el usuario" });
    }
};

const updateUsuario = async (req, res) => {
  const id = req.params.id;
  const datosActualizar = req.body;

  try {
    const usuario = await Usuario.findById(id);
    if(!usuario){
      console.log(colors.yellow("No se encontró el usuario para actualizarlo"));
      return res.status(404).json({ error: "Usuario no encontrado" });
    }else{
      const usuario = await Usuario.findByIdAndUpdate(id, datosActualizar, {
        new: true,
      });
      console.log(colors.blue("Usuario actualizado " + usuario.email));
      res.status(200).json({ mensaje: "Producto actualizado", usuario });
    }
  
  } catch (error) {
    res.status(500).json({
      error: "Error al actualizar el usuario. Error msg: " + error.message,
    });
  }
};

const deleteUsuario = async (req, res) => {
  const id = req.params.id;
  try {
    const usuario = await Usuario.findById(id);
    if (!usuario) {
      console.log(colors.yellow("No se encontró el usuario para borrarlo"));
      return res.status(404).json({ error: "Usuario no encontrado" });
    } else{
      await Usuario.findByIdAndDelete(id);
      console.log(colors.blue("Usuario borrado " + usuario.email));
      res.status(204).send(); // Respuesta exitosa sin contenido
    }
  } catch (error) {
    res.status(500).json({ error: "Error al intentar borrar el usuario" });
  }
};



module.exports = {
    getAllUsuarios,
    getUsuario,
    createUsuario,
    updateUsuario,
    deleteUsuario,
};