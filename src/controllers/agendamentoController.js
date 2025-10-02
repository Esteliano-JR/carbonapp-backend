// controllers/agendamentoController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.criarAgendamento = async (req, res) => {
  try {
    const { usuarioId, nomeCompleto, telefone, endereco, data, horario, observacoes, materiais } = req.body;

    const agendamento = await prisma.agendamento.create({
      data: {
        usuarioId,
        nomeCompleto,
        telefone,
        endereco,
        data,
        horario,
        observacoes,
        materiais: {
          create: materiais.map(id => ({ materialId: id }))
        }
      },
      include: { materiais: true }
    });

    res.status(201).json(agendamento);
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao criar agendamento' });
  }
};

// função confirmarAgendamento

exports.confirmarAgendamento = async (req, res) => {
  const { id } = req.params;

  try {
    const agendamento = await prisma.agendamento.findUnique({
      where: { id: Number(id) },
      include: { usuario: true }
    });

    if (!agendamento) {
      return res.status(404).json({ error: "Agendamento não encontrado" });
    }

    if (agendamento.status === "CONFIRMADO") {
      return res.status(400).json({ error: "Agendamento já confirmado" });
    }

    // Atualiza status
    await prisma.agendamento.update({
      where: { id: agendamento.id },
      data: { status: "CONFIRMADO" }
    });

    // Pontuação fixa por coleta (pode ser dinâmica depois)
    const pontos = 20;

    // Cria log de atividade
    await prisma.logAtividade.create({
      data: {
        usuarioId: agendamento.usuarioId,
        tipo: "COLETA",
        detalhes: `Coleta confirmada (+${pontos} pontos)`
      }
    });

    res.json({ message: "Coleta confirmada com sucesso", pontos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao confirmar agendamento" });
  }
};

// listar por usuario
exports.listarPorUsuario = async (req, res) => {
  const { usuarioId } = req.params;

  try {
    const agendamentos = await prisma.agendamento.findMany({
      where: { usuarioId: Number(usuarioId) },
      include: {
        materiais: {
          include: { material: true }
        }
      },
      orderBy: { data: "desc" }
    });

    const resultado = agendamentos.map(ag => ({
      id: ag.id,
      data: ag.data,
      horario: ag.horario,
      status: ag.status,
      observacoes: ag.observacoes,
      materiais: ag.materiais.map(m => m.material.nome)
    }));

    res.json(resultado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao listar agendamentos" });
  }
};