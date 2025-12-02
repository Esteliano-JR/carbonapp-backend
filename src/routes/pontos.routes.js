const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { calcularSaldoPontos } = require("../services/pontos.service");

router.get('/:usuarioId', async (req, res) => {
  const { usuarioId } = req.params;

  try {
    console.log("Buscando pontos para o ID:", usuarioId);
    const usuario = await prisma.user.findUnique({
      where: { id: Number(usuarioId) },
      include: {
        agendamentos: true,
        logAtividades: true
      }
    });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const pontos = await calcularSaldoPontos(usuario.id);
    const meta = 1500;
    const impacto = {
      materialReciclado: usuario.logAtividades?.length * 1.5 + "kg" || "0kg", // pode ser calculado futuramente
      oleoColetado: usuario.agendamentos?.length * 0.5 + "L" || "0L",
      coletasRealizadas: usuario.agendamentos.length || 0
    };

    res.json({ pontos, meta, impacto });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar dados de pontos' });
  }
});

module.exports = router;
