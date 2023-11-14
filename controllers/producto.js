const Producto = require("../models/producto");
const colors = require("picocolors");

const getAllProducts = async (req, res) => {
  try {
    const products = await Producto.find();
    if (!products || products.length === 0) {
      console.log(colors.yellow("No se encontraron productos"));
      return res.status(404).json({ error: "No se encontraron productos" });
    }
    console.log(colors.blue("Se han obtenido los productos"));
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los productos" });
  }
};

module.exports = {
    getAllProducts,
    //createProduct,
    //updateProduct,
    //deleteProduct,
    //getProductsByUserDescByDate,
    //getProductsByDescription,
    //getProduct,
  };