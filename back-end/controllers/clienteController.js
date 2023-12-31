const clienteModel = require('../models/clienteModel')
const auth = require('../auth/auth');

class ClienteController {

    async salvar(req, res) {
        try {
            const cliente = req.body
            if(await clienteModel.findOne({'email': cliente.email})){
                res.status(400).send({ error: 'Cliente já cadastrado!' });
            }

            const max = await clienteModel.findOne({}).sort({ codigo: -1 })
            cliente.codigo = max == null ? 1 : max.codigo + 1
            const file = req.file.buffer;
            cliente.foto = file;

            const resultado = await clienteModel.create(cliente)      
            auth.incluirToken(resultado);
            res.status(201).json(resultado)
        } catch (error) {
            res.status(500).json({error: "Erro ao salvar o cliente"})
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
            const _id = req.params.codigo
            const resultado = await clienteModel.findOne({ '_id': _id })
            res.status(200).json(resultado)
        } catch (error) {
            res.status(500).json({ error: 'Erro ao listar este cliente' })
        }
    }

    async atualizar(req, res) {
        try {
            const codigo = req.params.codigo
            const cliente = req.body
            const _id = String((await clienteModel.findOne({ 'codigo': codigo }))._id)
            
            const file = req.file.buffer;
            cliente.foto = file;

            await clienteModel.findByIdAndUpdate(String(_id), cliente)
            res.status(200).send()
        } catch (error) {
            res.status(500).json({ error: 'Erro ao atualizar este cliente' })
        }
    }
}

module.exports = new ClienteController()