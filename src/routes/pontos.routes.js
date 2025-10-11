const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/:usuarioId', async (req, res) => {
  const { usuarioId } = req.params;

  try {
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

    const pontos = usuario.pontos;
    const meta = 1500;
    const impacto = {
      materialReciclado: '15.2kg', // pode ser calculado futuramente
      oleoColetado: '8.5L',
      coletasRealizadas: usuario.agendamentos.length
    };

    res.json({ pontos, meta, impacto });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar dados de pontos' });
  }
});

module.exports = router;
