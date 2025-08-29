const express = require("express");
const router = express.Router();
const acoesController = require("../controllers/acoesController");

// POST /acoes → Registrar uma ação
router.post("/", acoesController.registrarAcao);

// GET /acoes → Listar todas as ações
router.get("/", acoesController.listarAcoes);

module.exports = router;

