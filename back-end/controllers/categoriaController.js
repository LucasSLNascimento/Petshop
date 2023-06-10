const categoriaModel = require('../models/categoriaModel')

class CategoriaController {

    async salvar(req, res) {
        try {
            let categoria = req.body
            const max = await categoriaModel.findOne({}).sort({ codigo: -1 })
            categoria.id = max == null ? 1 : max.id + 1
            const resultado = await categoriaModel.create(categoria)
            res.status(201).json(resultado)
        } catch (error) {
            res.status(500).json({ error: 'Erro ao salvar esta categoria' })
        }
    }

    async listar(req, res) {
        try {
            const resultado = await categoriaModel.find({})
            res.status(200).json(resultado)
        } catch (error) {
            res.status(500).json({ error: 'Erro ao listar as categorias' })
        }
    }

    async buscarPorId(req, res) {
        try {
            const codigo = req.params.codigo
            const resultado = await categoriaModel.findOne({ 'codigo': codigo })
            res.status(200).json(resultado)
        } catch (error) {
            res.status(500).json({ error: 'Erro ao listar esta categoria' })
        }
    }

    async atualizar(req, res) {
        try {
            const codigo = req.params.codigo
            const _id = String((await categoriaModel.findOne({ 'codigo': codigo }))._id)
            await categoriaModel.findByIdAndUpdate(String(_id), req.body)
            res.status(200).send()
        } catch (error) {
            res.status(500).json({ error: 'Erro ao atualizar esta categoria' })
        }
    }
}

module.exports = new CategoriaController()