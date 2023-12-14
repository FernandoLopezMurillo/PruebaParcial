import axios from 'axios';

const auth = axios.create({
    //baseURL: "https://prueba-parcial-m4zh.vercel.app/auth",
    baseURL: "https://localhost:3000/auth",
    headers: {
        "Content-Type" : 'application/json',
    },
});

export default auth;