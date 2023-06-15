var express = require('express');
var router = express.Router();
const produtoController = require('../controllers/produtoController')

router.get('/', produtoController.listar);
router.get('/:codigo', produtoController.buscarPorId);
router.post('/', produtoController.salvar);
router.put('/:codigo', produtoController.atualizar);

module.exports = router;