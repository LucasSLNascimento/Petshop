const mongoose = require('mongoose')

const pedidoSchema = new mongoose.Schema({
    codigo: Number, 
    prec_tot: Number,
    categoria: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'produto'
    },
    categoria: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cliente'
    },
    dataHora: Date,
    status: String //aguardando, faturado, enviado, cancelado
})