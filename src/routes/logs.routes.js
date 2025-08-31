const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/logsController");

router.get("/", ctrl.listar); // ?usuarioId=1

module.exports = router;
