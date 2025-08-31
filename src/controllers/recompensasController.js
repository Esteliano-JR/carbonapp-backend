const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.listar = async (req, res) => {
  try {
    const recs = await prisma.recompensa.findMany({ orderBy: { createdAt: "desc" } });
    res.json(recs);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Erro ao listar recompensas" });
  }
};

exports.criar = async (req, res) => {
  const { titulo, descricao, custoPontos } = req.body;
  if (!titulo || !custoPontos) return res.status(400).json({ error: "Dados inválidos" });

  try {
    const rec = await prisma.recompensa.create({
      data: { titulo, descricao: descricao || "", custoPontos: Number(custoPontos) },
    });
    res.status(201).json(rec);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Erro ao criar recompensa" });
  }
};