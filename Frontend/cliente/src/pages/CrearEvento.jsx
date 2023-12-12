import React, { useState } from "react";
import api from "../services/api";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const CrearEventoForm = () => {
  const navigate = useNavigate();
  const [eventoData, setEventoData] = useState({
    anfitrion: "",
    descripcion: "",
    inicio: "",
    duracion: 0,
    fotos: [],
    direccion: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventoData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Realizar la solicitud POST al servidor con los datos del evento
      const response = await api.post("/eventos", eventoData);
      console.log("Evento creado:", response.data);
      // Puedes hacer algo adicional después de crear el evento, como redirigir a la página de detalles del evento, etc.
      navigate('/')
    } catch (error) {
      console.error("Error al crear el evento:", error);
    }
  };

  const handleFileChange = async (e) => {
    const files = e.target.files;
    const photosArray = Array.from(files);
    photosArray.map(async (photo) => {
        const formData = new FormData();
        formData.append("file", photo);
        formData.append("upload_preset", "nvjt6gss"); 

        try {
        const response = await axios.post(
            "https://api.cloudinary.com/v1_1/dqgqftqw1/image/upload",
            formData
        );

        const imageUrl = response.data.secure_url;

        // Actualizar el estado con la URL de la imagen de Cloudinary
        setEventoData((prevData) => ({
            ...prevData,
            fotos: [...prevData.fotos, imageUrl],
        }));
        } catch (error) {
        console.error("Error al subir la imagen a Cloudinary:", error);
        }
    });
  };

  return (
    <div>
      <h2>Crear Nuevo Evento</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Anfitrión:
          <input
            type="text"
            name="anfitrion"
            value={eventoData.anfitrion}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Descripción:
          <input
            type="text"
            name="descripcion"
            value={eventoData.descripcion}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Inicio:
          <input
            type="datetime-local"
            name="inicio"
            value={eventoData.inicio}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Duración (en minutos):
          <input
            type="number"
            name="duracion"
            value={eventoData.duracion}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Fotos (separadas por comas):
          <input
            type="file"
            name="fotos"
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />
        </label>
        <br />
        <label>
          Dirección:
          <input
            type="text"
            name="direccion"
            value={eventoData.direccion}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Crear Evento</button>
      </form>
    </div>
  );
};

export default CrearEventoForm;