const mongoose = require('mongoose')
const moment = require ('moment');

const pedidoSchema = new mongoose.Schema({
    codigo: Number, 
    prec_tot: Number,
    produto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'produtos'
    },
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'clientes'
    },
    dataHora: {
        type: String,
        default: moment().format('DD/MM/YYYY HH:mm')
    },
    status:{
       type: String, //aguardando, faturado, enviado, cancelado
       default: 'aguardando'
    } 
})

module.exports = mongoose.model('pedidos', pedidoSchema)