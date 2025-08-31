const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.listar = async (req, res) => {
  const usuarioId = parseInt(req.query.usuarioId);
  if (isNaN(usuarioId)) return res.status(400).json({ error: "usuarioId inválido" });

  try {
    const logs = await prisma.logAtividade.findMany({
      where: { usuarioId },
      orderBy: { createdAt: "desc" },
    });
    res.json(logs);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Erro ao buscar logs" });
  }
};
