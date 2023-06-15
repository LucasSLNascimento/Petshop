var express = require('express');
var router = express.Router();
const categoriaController = require('../controllers/categoriaController')

router.get('/', categoriaController.listar);
router.get('/:codigo', categoriaController.buscarPorId);
router.post('/', categoriaController.salvar);
router.put('/:codigo', categoriaController.atualizar);

module.exports = router;