const Reserva = require('../models/Reserva');

const criarReserva = async (req, res) => {
  try {
    const reserva = new Reserva(req.body);
    await reserva.save();
    res.status(201).json(reserva);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Não foi possível criar a reserva' });
  }
};

const listarReservas = async (req, res) => {
  try {
    const reservas = await Reserva.find();
    res.json(reservas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

module.exports = {
  criarReserva,
  listarReservas,
};
