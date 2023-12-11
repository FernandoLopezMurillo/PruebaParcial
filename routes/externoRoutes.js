const express = require("express");
const router = express.Router();

const serviciosExternosController = require("../controllers/serviciosExternos");

router.get("/geocache",serviciosExternosController.geocache);

module.exports = router;