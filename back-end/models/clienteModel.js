const mongoose = require('mongoose')

const clienteSchema = new mongoose.Schema({
    codigo: Number,
    foto: String,
    nome: String, // nome completo
    endereco: String,
    telefone: Number,
    CPF: Number,
    cartaoCred: Number, // cartão de crédito
    email: String,
    senha: String
})

module.exports = mongoose.model('cliente', clienteSchema)