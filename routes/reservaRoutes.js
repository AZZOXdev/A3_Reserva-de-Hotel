const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reservaController');

router.post('/', reservaController.criarReserva);
router.get('/', reservaController.listarReservas);

module.exports = router;