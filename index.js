// configuração inicial //
const express = require('express');
const res = require('express/lib/response');
const app = express();

// forma de ler JSON //
app.use(
  express.urlencoded({
    extended: true
  })
)

app.use(express.json())

// rota inicial //

app.get('/', (req, res) => {

  res.json({ message: 'Ola express!'})

})

// Entregar uma porta //
app.listen(3000)