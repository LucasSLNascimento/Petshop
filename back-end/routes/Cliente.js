var express = require('express');
var router = express.Router();
const clienteController = require('../controllers/clienteController')

router.get('/', clienteController.listar);
router.get('/:codigo', clienteController.buscarPorId);
router.post('/', clienteController.salvar);
router.put('/:codigo', clienteController.atualizar);

module.exports = router;
