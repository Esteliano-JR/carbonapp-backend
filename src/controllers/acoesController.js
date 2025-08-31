const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// GET /acoes
exports.listarAcoes = async (req, res) => {
  try {
    const acoes = await prisma.acao.findMany({ orderBy: { id: "asc" } });
    res.json(acoes);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Erro ao buscar ações" });
  }
};

// POST /acoes/:id/registrar  { usuarioId }
exports.registrarAcao = async (req, res) => {
  const acaoId = parseInt(req.params.id);
  const { usuarioId } = req.body;

  if (!usuarioId || isNaN(acaoId)) {
    return res.status(400).json({ error: "Dados inválidos" });
  }

  try {
    // Verificar se o usuario Existe
    const usuario = await prisma.user.findUnique({ where: { id: Number(usuarioId) } });
    if (!usuario) return res.status(404).json({ error: "Usuário não encontrado" });

    // Verificar se ação já foi registrada por esse usuario
    const jaRegistrado = await prisma.usuarioAcao.findFirst({
      where: { usuarioId: Number(usuarioId), acaoId: acaoId }
    });
    if (jaRegistrado) {
      return res.status(400).json({ error: "Ação já registrada para este usuário" });
    }

    // Verifica se ação existe
    const acao = await prisma.acao.findUnique({ where: { id: acaoId } });
    if (!acao) return res.status(404).json({ error: "Ação não encontrada" });

    // registra no histórico
    await prisma.usuarioAcao.create({
      data: { usuarioId: Number(usuarioId), acaoId: acao.id },
    });

    // loga atividade
    await prisma.logAtividade.create({
      data: {
        usuarioId: Number(usuarioId),
        tipo: "AÇÃO",
        detalhes: `Realizou: ${acao.descricao} (+${acao.pontos} pontos)`,
      },
    });

    res.status(201).json({ message: "Ação registrada!", pontos: acao.pontos });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Erro ao registrar ação" });
  }
};
