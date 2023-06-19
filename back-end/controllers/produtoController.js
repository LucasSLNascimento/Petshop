const produtoModel = require('../models/produtoModel')
const categoriaModel = require('../models/categoriaModel')

class ProdutoController {

    async salvar(req, res) {
        try {
            
            const max = await produtoModel.findOne({}).sort({ codigo: -1 })
            const produto = req.body
            produto.codigo = max == null ? 1 : max.codigo + 1
           
            //const categoria = await categoriaModel.findOne({'codigo': produto.categoria.codigo})
            //produto.categoria = categoria._id

            if (req.file) {
                const imagemBuffer = req.file.buffer
                const imagemBase64 = imagemBuffer.toString('base64')
                produto.imagem = imagemBase64
            }
            
            const resultado = await produtoModel.create(produto)
            res.status(201).json(resultado)
        } catch (error) {
            res.status(500).json({ error: 'Erro ao salvar este produto' })
        }
    }

    async listar(req, res) {
        try {
            const resultado = await produtoModel.find({'produtoId': req.params.categoriaId})
            res.status(200).json(resultado)
        } catch (error) {
            res.status(500).json({ error: 'Erro ao listar os produtos' })
        }
    }

    async buscarPorId(req, res) {
        try {
            const codigo = req.params.codigo
            const resultado = await produtoModel.findOne({ 'codigo': codigo })
            res.status(200).json(resultado)
        } catch (error) {
            res.status(500).json({ error: 'Erro ao listar este produto' })
        }
    }

    async atualizar(req, res) {
        try {
            const codigo = req.params.codigo
            const _id = String((await produtoModel.findOne({ 'codigo': codigo }))._id)
            
            if (req.file) {
                const imagemBuffer = req.file.buffer
                const imagemBase64 = imagemBuffer.toString('base64')
                req.body.imagem = imagemBase64
            }

            await produtoModel.findByIdAndUpdate(String(_id), req.body)
            res.status(200).send()
        } catch (error) {
            res.status(500).json({ error: 'Erro ao atualizar este produto' })
        }
    }
}

module.exports = new ProdutoController()