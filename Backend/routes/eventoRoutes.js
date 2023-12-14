const express = require("express");
const router = express.Router();
const verifyTokenMiddleware = require("./middleWareAuth");


const eventoController = require("../controllers/evento");

router.use(verifyTokenMiddleware);
//CRUD de productos. Se pone despues de las rutas anteriores para que no interfiera con ellas
router.get("/", eventoController.getAllEventos); 
router.get("/:id", eventoController.getEventos); 
router.post("/", eventoController.createEvento); 
router.put("/:id", eventoController.updateEvento); 
router.delete("/:id", eventoController.deleteEvento);


module.exports = router;