// routes/agendamento.routes.js
const express = require('express');
const router = express.Router();
const agendamentoController = require('../controllers/agendamentoController');

router.post('/', agendamentoController.criarAgendamento);
router.get('/usuario/:usuarioId', agendamentoController.listarPorUsuario);
router.get('/parceiro/:id', agendamentoController.listarPorParceiro);
router.patch('/:id/confirmar', agendamentoController.confirmarAgendamento);

module.exports = router;