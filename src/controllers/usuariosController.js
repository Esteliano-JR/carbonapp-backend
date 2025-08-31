const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// GET /usuarios → listar todos os usuários
exports.listarUsuarios = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: {
         usuarioAcoes: {
        include: { acao: true }
         },
         resgates: true,
         logAtividade:true // trás ações do usuário
        }
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar usuários" });
  }
};

// POST /usuarios → criar usuário
const bcrypt = require("bcrypt");

exports.criarUsuario = async (req, res) => {
  try {
    const { name, cpf, email, senha, rua, complemento, cidade, cep } = req.body;

    const senhaHash = await bcrypt.hash(senha, 10);

    const novoUsuario = await prisma.user.create({
      data: {
        name,
        cpf,
        email,
        rua,
        complemento,
        cidade,
        cep,
        auth: {
          create: {
            password: senhaHash
          }
        }
      }
    });

    res.status(201).json({ message: "Usuário criado com sucesso", id: novoUsuario.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar usuário" });
  }
};

const { calcularSaldoPontos } = require("../services/pontos.service");

exports.saldoPontos = async (req, res) => {
  const usuarioId = parseInt(req.params.id);
  if (isNaN(usuarioId)) return res.status(400).json({ error: "Usuário inválido" });

  try {
    const saldo = await calcularSaldoPontos(usuarioId);
    res.json({ usuarioId, saldo });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Erro ao calcular saldo" });
  }
};


