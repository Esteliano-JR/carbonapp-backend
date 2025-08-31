const express = require("express");
const router = express.Router();
const rankingController = require("../controllers/rankingController");

/**
 * @swagger
 * /ranking:
 *   get:
 *     summary: Listar ranking de usuários por EcoPontos
 *     tags: [Ranking]
 *     responses:
 *       200:
 *         description: Lista de usuários com pontos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   usuarioId:
 *                     type: string
 *                     example: "12345"
 *                   nome:
 *                     type: string
 *                     example: "Esteliano"
 *                   pontos:
 *                     type: integer
 *                     example: 150
 */
// GET /ranking → Ranking dinâmico
router.get("/", rankingController.listarRanking);

module.exports = router;