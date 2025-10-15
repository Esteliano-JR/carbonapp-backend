const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();

exports.cadastrar = async (req, res) => {
  const { name, cpf, email, rua, complemento, cidade, cep, password } = req.body;
  if (!name || !cpf || !email || !rua || !cidade || !cep || !password) {
    return res.status(400).json({ error: "Dados incompletos" });
  }

  try {
    const existe = await prisma.user.findUnique({ where: { email } });
    if (existe) return res.status(400).json({ error: "Email já cadastrado" });

    const novoUsuario = await prisma.user.create({
      data: { name, cpf, email, rua, complemento, cidade, cep },
    });

    const senhaHash = await bcrypt.hash(password, 10);
    await prisma.auth.create({
      data: { userId: novoUsuario.id, password: senhaHash },
    });

    res.status(201).json({ message: "Usuário cadastrado com sucesso", id: novoUsuario.id });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Erro ao cadastrar usuário" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Dados incompletos" });

  try {
    const usuario = await prisma.user.findUnique({ where: { email }, include: { auth: true } });
    if (!usuario || !usuario.auth) return res.status(404).json({ error: "Usuário não encontrado" });

    const senhaValida = await bcrypt.compare(password, usuario.auth.password);
    if (!senhaValida) return res.status(401).json({ error: "Senha incorreta" });
     const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, { expiresIn: "1d" });


    res.json({ message: "Login bem-sucedido", usuarioId: usuario.id, token });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Erro ao fazer login" });
  }
};