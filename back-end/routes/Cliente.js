var express = require('express');
var router = express.Router();
const clienteController = require('../controllers/clienteController')

router.get('/clientes', clienteController.listar)

module.exports = router;
