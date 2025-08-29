const request = require("supertest");
const express = require("express");
const app = express();
app.use(express.json());

// Importa a rota
const acoesRoutes = require("../routes/acoes.routes");

app.use("/acoes", acoesRoutes);

describe("POST /acoes", () => {
  it("Deve registrar uma ação corretamente", async () => {
    const res = await request(app)
      .post("/acoes")
      .send({
        usuarioId: 1,
        descricao: "Testando ação",
        pontos: 10,
      });
      
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("Ação registrada com sucesso");
    expect(res.body.usuarioId).toBe(1);
    expect(res.body.descricao).toBe("Testando ação");
    expect(res.body.pontos).toBe(10);
  });

  it("Deve retornar erro se faltar algum dado", async () => {
    const res = await request(app)
      .post("/acoes")
      .send({
        usuarioId: 1,
        descricao: "Ação sem pontos",
      });
      
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Dados inválidos");
  });
});
