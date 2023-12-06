const mongoose = require('mongoose');

const ReservaSchema = new mongoose.Schema({
  nome: String,
  data_checkin: Date,
  data_checkout: Date,
  quarto: String,
});

const Reserva = mongoose.model('Reserva', ReservaSchema);

module.exports = Reserva;
