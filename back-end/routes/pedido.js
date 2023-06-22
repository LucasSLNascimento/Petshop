var express = require('express');
var router = express.Router();
const pedidoController = require('../controllers/pedidoController')
const auth = require('../auth/auth')

router.use(auth.autorizar)

router.get('/', pedidoController.listar);
router.get('/:codigo', pedidoController.buscarPorId);
router.post('/', pedidoController.salvar);
router.put('/:codigo', pedidoController.atualizar);

module.exports = router;