const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { calcularSaldoPontos } = require("../services/pontos.service");

exports.listarPorUsuario = async (req, res) => {
  const usuarioId = parseInt(req.query.usuarioId);
  if (isNaN(usuarioId)) return res.status(400).json({ error: "usuarioId inválido" });

  try {
    const resgates = await prisma.resgate.findMany({
      where: { usuarioId },
      include: { recompensa: true },
      orderBy: { createdAt: "desc" },
    });
    res.json(resgates);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Erro ao listar resgates" });
  }
};

exports.resgatar = async (req, res) => {
  const { usuarioId, recompensaId } = req.body;
  if (!usuarioId || !recompensaId) return res.status(400).json({ error: "Dados inválidos" });

  try {
    const recompensa = await prisma.recompensa.findUnique({ where: { id: Number(recompensaId) } });
    if (!recompensa) return res.status(404).json({ error: "Recompensa não encontrada" });

    const saldo = await calcularSaldoPontos(Number(usuarioId));
    if (saldo < recompensa.custoPontos) {
      return res.status(400).json({ error: "Pontos insuficientes", saldoAtual: saldo });
    }

    const resgate = await prisma.resgate.create({
      data: { usuarioId: Number(usuarioId), recompensaId: Number(recompensaId) },
    });

    await prisma.logAtividade.create({
      data: {
        usuarioId: Number(usuarioId),
        tipo: "RESGATE",
        detalhes: `Resgatou: ${recompensa.titulo} (-${recompensa.custoPontos} pontos)`,
      },
    });

    const novoSaldo = await calcularSaldoPontos(Number(usuarioId));
    res.status(201).json({ resgate, saldoAnterior: saldo, saldoAtual: novoSaldo });
  } catch (e) {
    console.error("Erro detalhado:", e);
    res.status(500).json({ error: "Erro ao resgatar", detalhes: e.message });
  }
};