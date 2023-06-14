var express = require('express');
var router = express.Router();
const clienteController = require('../controllers/clienteController')

router.get('/', clienteController.listar);
router.post('/cadastro', clienteController.salvar);

module.exports = router;
