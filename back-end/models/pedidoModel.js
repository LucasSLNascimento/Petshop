const mongoose = require('mongoose')

const pedidoSchema = new mongoose.Schema({
    codigo: Number, 
    prec_tot: Number,
    produto: [{
        nome: String,
        quant: Number
    }],
    cliente: Number,

    /*
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cliente'
    },
    */
    
    dataHora: {
        type: Date,
        default: Date.now
    },
    status: String //aguardando, faturado, enviado, cancelado
})

module.exports = mongoose.model('pedidos', pedidoSchema)