const express = require("express");
const router = express.Router();
const acoesController = require("../controllers/acoesController");

// POST /acoes
router.post("/", acoesController.registrarAcao);

module.exports = router;
