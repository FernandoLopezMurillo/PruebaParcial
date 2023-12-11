const axios = require("axios");
const colors = require("picocolors");

const NodeCache = require("node-cache");
const cache = new NodeCache();

const geocache = async (req, res) => {
  const direccion = req.query.direccion;
  const direccionCodificada = encodeURIComponent(direccion);

  const cachedCoordinates = cache.get(direccionCodificada);

  if(cachedCoordinates) {
    console.log('Coordenadas obtenidas de la caché');
    return res.json(cachedCoordinates);
  }
  try {
    const apiUrl = `https://nominatim.openstreetmap.org/search?q=${direccionCodificada}&format=json&limit=1`;

    const response = await axios.get(apiUrl);
    const result = response.data[0];
    const coordinates = {
      posicion: [result.lat, result.lon],
      nombre: direccionCodificada,
    };
    cache.set(direccionCodificada, coordinates, 5 * 60);
    console.log('Obteniendo coordenadas desde la API');
    res.json(coordinates);
  
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error al obtener coordenadas' });
  }
}

module.exports = {
    geocache,
}