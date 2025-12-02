const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// GET /reciclagem/:id → histórico de reciclagem do usuário
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const atividades = await prisma.logAtividade.findMany({
      where: { usuarioId: Number(id) },
      orderBy: { createdAt: "desc" },
      take: 5
    });

    const resultado = atividades.map(a => ({
      material: a.tipo,
      data: a.createdAt.toLocaleDateString("pt-BR"),
      pontos: a.tipo === "COLETA" ? 150 : 100 // ajuste conforme sua lógica
    }));

    res.json(resultado);
  } catch (error) {
    console.error("Erro ao buscar histórico de reciclagem:", error);
    res.status(500).json({ error: "Erro ao buscar histórico de reciclagem" });
  }
});

module.exports = router;