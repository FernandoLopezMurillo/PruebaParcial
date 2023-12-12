import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import api from '../services/api';
import MapaMultiple from "../components/MapaMultiple";

const HomePage = () => {
    const [eventos, setEventos] = useState([]);
    const [direcciones, setDirecciones] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const eventos = await api.get(`/eventos`);
                setEventos(eventos.data);

                const direccionesArray = eventos.data.map((evento) => evento.direccion);
                setDirecciones(direccionesArray);

            } catch(error){
                console.error('Error fetching eventos: ', error);
            }
        }
        fetchData();
    }, []);

    return(
        <div>
            <Link to="/crear-evento">
                <button>Crear Evento</button>
            </Link>
            {eventos.map((evento) => (
                <p>{`${evento.anfitrion}`}</p>
            ))} 
            {direcciones.length > 0 && (
                <div
                style={{
                    marginTop: "20px",
                    width: "55%",
                    marginLeft: "auto",
                    marginRight: "auto",
                    border: "2px solid #ccc",
                    borderRadius: "8px",
                    padding: "10px",
                }}
                >
                <MapaMultiple
                    filtrarMapa={true}
                    direcciones={direcciones}
                />
                </div>
            )}
        </div>
    );
};

export default HomePage;