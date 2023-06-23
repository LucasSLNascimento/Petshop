const mongoose = require('mongoose')
const moment = require ('moment');

const pedidoSchema = new mongoose.Schema({
    codigo: Number, 
    prec_tot: Number,
    produto: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'produto',
        quant: Number
    }],
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cliente'
    },
    
    dataHora: {
        type: String,
        default: moment().format('DD/MM/YYYY HH:mm')
    },
    status: String //aguardando, faturado, enviado, cancelado
})

module.exports = mongoose.model('pedidos', pedidoSchema)