const express = require("express");
const router = express.Router();

// Rota de teste de usuário
router.get("/", (req, res) => {
  res.json({ message: "Rota de usuários funcionando!" });
});

module.exports = router;
