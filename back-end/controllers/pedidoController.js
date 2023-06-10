const pedidoModel = require('../models/pedidoModel')

class PedidoController {

    async salvar(req, res) {
        try {
            let pedido = req.body
            const max = await pedidoModel.findOne({}).sort({ codigo: -1 })
            pedido.id = max == null ? 1 : max.id + 1
            const resultado = await pedidoModel.create(pedido)
            res.status(201).json(resultado)
        } catch (error) {
            res.status(500).json({ error: 'Erro ao salvar este pedido' })
        }
    }

    async listar(req, res) {
        try {
            const resultado = await pedidoModel.find({})
            res.status(200).json(resultado)
        } catch (error) {
            res.status(500).json({ error: 'Erro ao listar os pedidos' })
        }
    }

    async buscarPorId(req, res) {
        try {
            const codigo = req.params.codigo
            const resultado = await pedidoModel.findOne({ 'codigo': codigo })
            res.status(200).json(resultado)
        } catch (error) {
            res.status(500).json({ error: 'Erro ao listar este pedido' })
        }
    }

    async atualizar(req, res) {
        try {
            const codigo = req.params.codigo
            const _id = String((await pedidoModel.findOne({ 'codigo': codigo }))._id)
            await pedidoModel.findByIdAndUpdate(String(_id), req.body)
            res.status(200).send()
        } catch (error) {
            res.status(500).json({ error: 'Erro ao atualizar este pedido' })
        }
    }
}

module.exports = new PedidoController()