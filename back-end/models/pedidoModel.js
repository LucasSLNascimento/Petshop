const mongoose = require('mongoose')
import moment from 'moment';

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
        type: String,
        default: moment().format('DD/MM/YYYY HH:mm')
    },
    status: String //aguardando, faturado, enviado, cancelado
})

module.exports = mongoose.model('pedidos', pedidoSchema)