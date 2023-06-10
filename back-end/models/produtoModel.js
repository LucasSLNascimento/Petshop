const mongoose = require('mongoose')

const produtoSchema = new mongoose.Schema({
    codigo: Number,
    nome: String,
    imagem: String,
    descricao: String,
    preco: Number,
    categoria: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categoria'
    },
    animal: String,
    coments: []
})

module.exports = mongoose.model('produto', produtoSchema)