const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.registrarAcao = async (req, res) => {
  const { usuarioId, descricao, pontos } = req.body;

  if (!usuarioId || !descricao || !pontos) {
    return res.status(400).json({ error: "Dados inválidos" });
  }

  try {
    const acao = await prisma.acao.create({
      data: {
        usuarioId,
        descricao,
        pontos,
      },
    });

    return res.status(201).json({
      message: "Ação registrada com sucesso",
      acao,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao registrar ação no banco" });
  }
};

