exports.registrarAcao = (req, res) => {
  const { usuarioId, descricao, pontos } = req.body;

  if (!usuarioId || !descricao || !pontos) {
    return res.status(400).json({ error: "Dados inválidos" });
  }

  // Aqui você poderia salvar no banco de dados
  return res.status(201).json({
    message: "Ação registrada com sucesso",
    usuarioId,
    descricao,
    pontos,
  });
};

