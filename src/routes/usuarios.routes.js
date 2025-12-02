const express = require("express");
const router = express.Router();
const usuariosController = require("../controllers/usuariosController");


// rota GET - listar todos os usuários
router.get("/", usuariosController.listarUsuarios);

// rota POST - criar novo usuário
router.post("/", usuariosController.criarUsuario);

module.exports = router;

