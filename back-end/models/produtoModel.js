const mongoose = require('mongoose')

const produtoSchema = new mongoose.Schema({
    codigo: Number,
    nome: String,
    imagem: {
        type: Buffer
    },
    descricao: String,
    preco: Number,
    categoria: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categorias'
    },
    animal: String,
    coments: [{
        comentario: String,
        nota: Number
    }]
})

module.exports = mongoose.model('produto', produtoSchema)