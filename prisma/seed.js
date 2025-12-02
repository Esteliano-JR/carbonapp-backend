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
  await prisma.material.deleteMany(); // limpa antes

  await prisma.material.createMany({
  data: [
    { nome: "Alumínio" },
    { nome: "Plástico" },
    { nome: "Cobre" },
    { nome: "Papelão" },
    { nome: "Óleo" }
  ],
  skipDuplicates: true
});



  await prisma.acao.createMany({
    data: [
      { descricao: "Reciclar plástico", pontos: 10 },
      { descricao: "Usar veículo elétrico", pontos: 30 },
      { descricao: "Plantar uma árvore", pontos: 50 },
      { descricao: "Usar bicicleta ao invés de carro", pontos: 15 },
    ],
    skipDuplicates: true,
  });

  // parceiro de teste
  const parceiro = await prisma.parceiro.upsert({
  where: { email: "parceiro@eco.local" },
  update: {},
  create: {
    nome: "Coleta Verde",
    email: "parceiro@eco.local",
    telefone: "91999999999",
    cidade: "Belém",
    estado: "PA"
  }
});

// agendamento de teste
const agendamento = await prisma.agendamento.create({
  data: {
    usuarioId: user.id,
    parceiroId: parceiro.id,
    nomeCompleto: "Usuário Demo",
    telefone: "91988888888",
    endereco: "Rua Teste, 101",
    data: new Date("2025-09-10"),
    horario: "14:00",
    observacoes: "5 sacos de plástico e óleo usado"
  }
});

const materiais = await prisma.material.findMany();
await prisma.agendamentoMaterial.createMany({
  data: materiais.map(m => ({
    agendamentoId: agendamento.id,
    materialId: m.id
  })),
  skipDuplicates: true
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