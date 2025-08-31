const express = require("express");
const router = express.Router();
const usuariosController = require("../controllers/usuariosController");

router.get("/:id/pontos",usuariosController.saldoPontos);

// rota GET - listar todos os usuários
router.get("/", usuariosController.listarUsuarios);

// rota POST - criar novo usuário
router.post("/", usuariosController.criarUsuario);

module.exports = router;

