const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const reservaRoutes = require('./routes/reservaRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');

const app = express();

mongoose.connect('mongodb+srv://Tiago:aBVlCllpGsLqNwjn@cluster0.i1f48f9.mongodb.net/?retryWrites=true&w=majoritymongodb+srv://Tiago:<dMu534tjRaFfUgzn>@cluster0.i1f48f9.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/reservas', reservaRoutes);
app.use('/usuarios', usuarioRoutes);

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
