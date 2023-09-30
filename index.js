// configuração inicial //
const express = require('express');
const res = require('express/lib/response');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// Conectar ao banco de dados MongoDB
mongoose.connect('mongodb+srv://Tiago:<dMu534tjRaFfUgzn>@cluster0.i1f48f9.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// forma de ler JSON //
app.use(
  express.urlencoded({
    extended: true
  })
)

app.use(express.json())


// Definir um modelo de reserva //
const Reserva = mongoose.model('Reserva', {
  nome: String,
  data_checkin: Date,
  data_checkout: Date,
  quarto: String,
});

app.use(bodyParser.json());

// Criar uma reserva //
app.post('/reservas', async (req, res) => {
  try {
    const reserva = new Reserva(req.body);
    await reserva.save();
    res.status(201).json(reserva);
  } catch (error) {
    res.status(400).json({ error: 'Não foi possível criar a reserva' });
  }
});

// Listar todas as reservas //
app.get('/reservas', async (req, res) => {
  const reservas = await Reserva.find();
  res.json(reservas);
});

// Obter uma reserva por ID //
app.get('/reservas/:id', async (req, res) => {
  const reserva = await Reserva.findById(req.params.id);
  if (!reserva) {
    res.status(404).json({ error: 'Reserva não encontrada' });
  } else {
    res.json(reserva);
  }
});

// Atualizar uma reserva por ID //
app.put('/reservas/:id', async (req, res) => {
  try {
    const reserva = await Reserva.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!reserva) {
      res.status(404).json({ error: 'Reserva não encontrada' });
    } else {
      res.json(reserva);
    }
  } catch (error) {
    res.status(400).json({ error: 'Não foi possível atualizar a reserva' });
  }
});

// Excluir uma reserva por ID //
app.delete('/reservas/:id', async (req, res) => {
  try {
    const reserva = await Reserva.findByIdAndDelete(req.params.id);
    if (!reserva) {
      res.status(404).json({ error: 'Reserva não encontrada' });
    } else {
      res.json({ message: 'Reserva excluída com sucesso' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Não foi possível excluir a reserva' });
  }
});

// Entregar uma porta //
app.listen(3000)