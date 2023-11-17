const express = require("express");
const colors = require("picocolors");
const v1ProductRouter = require("./routes/productRoutes");
const v1UsuarioRouter = require("./routes/usuarioRoutes");
const v1EventoRouter = require("./routes/eventoRoutes");

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.use("/api/productos", v1ProductRouter);
app.use("/api/usuarios", v1UsuarioRouter);
app.use("/api/eventos", v1EventoRouter);

app.listen(PORT, () => {
    console.log(colors.bgGreen(`Server is running on port ${PORT}`));
});
  
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://0619987850:1234@pruebaparcial.5gnugzx.mongodb.net/Parcial2?retryWrites=true&w=majority&appName=AtlasApp");
  
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