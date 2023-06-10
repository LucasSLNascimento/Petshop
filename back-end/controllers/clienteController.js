const clienteModel = require('../models/clienteModel')

class ClienteController {

    async salvar(req, res) {
        try {
            let cliente = req.body
            const max = await clienteModel.findOne({}).sort({ codigo: -1 })
            cliente.id = max == null ? 1 : max.id + 1
            const resultado = await clienteModel.create(cliente)
            res.status(201).json(resultado)
        } catch (error) {
            res.status(500).json({ error: 'Erro ao salvar este cliente' })
        }
    }

    async listar(req, res) {
        try {
            const resultado = await clienteModel.find({})
            res.status(200).json(resultado)
        } catch (error) {
            res.status(500).json({ error: 'Erro ao listar os clientes' })
        }
    }

    async buscarPorId(req, res) {
        try {
            const codigo = req.params.codigo
            const resultado = await clienteModel.findOne({ 'codigo': codigo })
            res.status(200).json(resultado)
        } catch (error) {
            res.status(500).json({ error: 'Erro ao listar este cliente' })
        }
    }

    async atualizar(req, res) {
        try {
            const codigo = req.params.codigo
            const _id = String((await clienteModel.findOne({ 'codigo': codigo }))._id)
            await clienteModel.findByIdAndUpdate(String(_id), req.body)
            res.status(200).send()
        } catch (error) {
            res.status(500).json({ error: 'Erro ao atualizar este cliente' })
        }
    }
}

module.exports = new ClienteController()