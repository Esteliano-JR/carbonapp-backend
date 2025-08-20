const express = require("express");
const router = express.Router();

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
router.get("/", (req, res) => {
  const ranking = [
    { usuarioId: "1", nome: "Esteliano", pontos: 150 },
    { usuarioId: "2", nome: "Maria", pontos: 120 },
    { usuarioId: "3", nome: "João", pontos: 100 },
  ];

  res.json(ranking);
});

module.exports = router;
