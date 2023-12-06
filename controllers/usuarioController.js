const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registro = async (req, res) => {
  try {
    const { nome, email, senha, perfil } = req.body;

    // Verifica se o e-mail já está em uso
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ error: 'E-mail já cadastrado' });
    }

    // Criptografar a senha antes de salvar no banco de dados
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const usuario = new Usuario({
      nome,
      email,
      senha: senhaCriptografada,
      perfil,
    });

    await usuario.save();
    res.status(201).json({ message: 'Usuário registrado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

const login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    // Verifica se o usuário existe
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Verifica a senha
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Gere um token de autenticação
    const token = jwt.sign({ id: usuario._id, perfil: usuario.perfil }, 'chave_secreta_do_jwt');

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

const listarUsuarios = async (req, res) => {
  try {
    // Verifica se o usuário autenticado é um administrador
    if (req.usuario.perfil !== 'admin') {
      return res.status(403).json({ error: 'Acesso negado' });
    }

    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

module.exports = {
  registro,
  login,
  listarUsuarios,
};
