import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import api from '../services/api';
import { Link } from "react-router-dom";



const Detalles = () => {
    const {id} = useParams();
    const [evento, setEvento] = useState(null);

    useEffect(() => {
        const fetchEventoDetails = async () => {
            const response = await api.get(`/eventos/${id}`);
            setEvento(response.data);
        };
        fetchEventoDetails();

    }, [id]);

    return (
        <div>
            {evento && (
                <div>
                    <h5>Titulo evento: {evento.nombre}</h5>
                    <h5>Inicio del evento: {evento.inicio}</h5>
                    <h5>Lugar: {evento.direccion}</h5>
                    <h5>Email organizador: {evento.organizador}</h5>
                    <h5>Imagenes:</h5> <img style={{maxHeight: '300px'}} src={evento.fotos}></img>
                    <Link to={`/`}>
                        <button>Inicio</button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Detalles