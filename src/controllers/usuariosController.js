exports.listarUsuarios = (req, res) => {
  // Aqui você buscaria usuários no banco
  res.json([{ id: 1, nome: "Esteliano" }]);
};
