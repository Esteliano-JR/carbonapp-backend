const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // garante um usuário para testes
  const user = await prisma.user.upsert({
    where: { email: "demo@carbonapp.local" },
    update: {},
    create: {
      name: "Usuário Demo",
      cpf: "00000000000",
      email: "demo@carbonapp.local",
      rua: "Rua Teste",
      complemento: "Apto 101",
      cidade: "Cidade Teste",
      cep: "00000000"
    },
  });

  // ações pré-definidas
  await prisma.acao.createMany({
    data: [
      { descricao: "Reciclar plástico", pontos: 10 },
      { descricao: "Usar veículo elétrico", pontos: 30 },
      { descricao: "Plantar uma árvore", pontos: 50 },
      { descricao: "Usar bicicleta ao invés de carro", pontos: 15 },
    ],
    skipDuplicates: true,
  });

  // recompensas de teste
  await prisma.recompensa.createMany({
    data: [
      {
        titulo: "Camiseta Sustentável",
        descricao: "Feita com algodão orgânico",
        custoPontos: 20
      },
      {
        titulo: "Garrafa Reutilizável",
        descricao: "Aço inoxidável, 500ml",
        custoPontos: 15
      }
    ],
    skipDuplicates: true
  });

  console.log("Seed ok. Usuário demo id:", user.id);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });