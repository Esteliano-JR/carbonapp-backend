const express = require("express");
const router = express.Router();

/**
 * @swagger
 * /acoes:
 *   post:
 *     summary: Registrar uma nova ação sustentável
 *     tags: [Ações]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuarioId:
 *                 type: string
 *                 example: "12345"
 *               descricao:
 *                 type: string
 *                 example: "Plantio de árvore"
 *               pontos:
 *                 type: integer
 *                 example: 50
 *     responses:
 *       201:
 *         description: Ação registrada com sucesso
 *       400:
 *         description: Erro na requisição
 */
router.post("/", (req, res) => {
  const { usuarioId, descricao, pontos } = req.body;

  if (!usuarioId || !descricao || !pontos) {
    return res.status(400).json({ error: "Dados inválidos" });
  }

  return res.status(201).json({
    message: "Ação registrada com sucesso",
    usuarioId,
    descricao,
    pontos,
  });
});

module.exports = router;