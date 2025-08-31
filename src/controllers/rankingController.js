const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.listarRanking = async (req, res) => {
  try {
    const ranking = await prisma.user.findMany({
      include: { acoes: true },
    });

    // calcular pontos por usuário
    const rankingCalc = ranking.map(user => {
      const pontosTotais = user.acoes.reduce((acc, acao) => acc + acao.pontos, 0);
      return { usuarioId: user.id, nome: user.name, pontos: pontosTotais };
    });

    // ordenar por pontos
    rankingCalc.sort((a, b) => b.pontos - a.pontos);

    res.json(rankingCalc);
  } catch (error) {
    res.status(500).json({ error: "Erro ao gerar ranking" });
  }
};


