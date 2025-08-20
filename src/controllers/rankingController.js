exports.listarRanking = (req, res) => {
  // Aqui você buscaria usuários no banco de dados e ordenaria pelos pontos
  const ranking = [
    { usuarioId: "1", nome: "Esteliano", pontos: 150 },
    { usuarioId: "2", nome: "Maria", pontos: 120 },
    { usuarioId: "3", nome: "João", pontos: 100 },
  ];

  res.json(ranking);
};
