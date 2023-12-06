const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
  nome: String,
  email: String,
  senha: String,
  perfil: { type: String, enum: ['admin', 'usuario'], default: 'usuario' },
});

const Usuario = mongoose.model('Usuario', UsuarioSchema);

module.exports = Usuario;
