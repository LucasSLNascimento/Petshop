const produtoModel = require('../models/produtoModel')

class ProdutoController {

    async salvar(req, res) {
        try {
            let produto = req.body
            const max = await produtoModel.findOne({}).sort({ codigo: -1 })
            produto.id = max == null ? 1 : max.id + 1
            const resultado = await produtoModel.create(produto)
            res.status(201).json(resultado)
        } catch (error) {
            res.status(500).json({ error: 'Erro ao salvar este produto' })
        }
    }

    async listar(req, res) {
        try {
            const resultado = await produtoModel.find({})
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
            await produtoModel.findByIdAndUpdate(String(_id), req.body)
            res.status(200).send()
        } catch (error) {
            res.status(500).json({ error: 'Erro ao atualizar este produto' })
        }
    }
}

module.exports = new ProdutoController()