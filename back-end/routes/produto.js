var express = require('express');
var router = express.Router();
const produtoController = require('../controllers/produtoController')

const multer = require('multer');
const upload = multer();

router.get('/', produtoController.listar);
router.get('/:codigo', produtoController.buscarPorId);
router.post('/', upload.single('imagem'), produtoController.salvar);
router.put('/:codigo', upload.single('imagem'), produtoController.atualizar);

module.exports = router;