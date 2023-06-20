var express = require('express');
var router = express.Router();
const clienteController = require('../controllers/clienteController')

const multer = require('multer');
const upload = multer();

router.get('/', clienteController.listar);
router.get('/:codigo', clienteController.buscarPorId);
router.post('/', upload.single('foto'), clienteController.salvar);
router.put('/:codigo', upload.single('foto'), clienteController.atualizar);

module.exports = router;
