const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function calcularSaldoPontos(usuarioId) {
  // soma pontos de ações realizadas
  const realizados = await prisma.usuarioAcao.findMany({
    where: { usuarioId },
    include: { acao: true },
  });
  const pontosAcoes = realizados.reduce((acc, r) => acc + (r.acao?.pontos || 0), 0);

  // subtrai custo de resgates
  const resgates = await prisma.resgate.findMany({
    where: { usuarioId },
    include: { recompensa: true },
  });
  const pontosResgatados = resgates.reduce((acc, r) => acc + (r.recompensa?.custoPontos || 0), 0);

  return pontosAcoes - pontosResgatados;
}

module.exports = { calcularSaldoPontos, prisma };
