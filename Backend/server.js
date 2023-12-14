const express = require("express");
const cors = require("cors");
const colors = require("picocolors");
const v1UsuarioRouter = require("./routes/usuarioRoutes");
const v1EventoRouter = require("./routes/eventoRoutes");
const v1ExternoRouter = require("./routes/externoRoutes");
const v1AuthRouter = require("./routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors(
    {
        origin: "https://prueba-parcial-m4zh.vercel.app",
        //origin: "*",
        methods: ["POST", "GET"],
        credentials: true
    }
));
app.use(express.json());

/*app.get("/", (req,res) => {
    res.json("Hello");
})*/

app.use("/api/usuarios", v1UsuarioRouter);
app.use("/api/eventos", v1EventoRouter);
app.use("/api/externos", v1ExternoRouter);
app.use("/auth", v1AuthRouter);

app.listen(PORT, () => {
    console.log(colors.bgGreen(`Server is running on port ${PORT}`));
});
  
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://0619987850:1234@pruebaparcial.5gnugzx.mongodb.net/Parcial3?retryWrites=true&w=majority&appName=AtlasApp");
  
  // Control de errores
const db = mongoose.connection;
  
db.on("error", console.error.bind(console, "Error de conexión a MongoDB:"));
db.once("open", () => {
    console.log(colors.bgGreen("Conectado a la base de datos MongoDB"));
});
  
app.use((err, req, res, next) => {
    console.error(colors.red(err.stack));
    res.status(500).json({ error: "Something went wrong!" });
});

module.exports = app;