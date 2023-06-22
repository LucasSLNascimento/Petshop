const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const clienteSchema = new mongoose.Schema({
    codigo: Number,
    foto: {
        type: Buffer
    },
    nome: String, // nome completo
    endereco: String,
    telefone: Number,
    CPF: Number,
    credNome: String, // cartão de crédito(cred é de crédito)
    credNum: Number,
    credCvc: Number,
    email:{
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    senha: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        select: false
    }
})

clienteSchema.pre('save', async function(next){
    const hash = await bcryptjs.hash(this.senha, 10);
    this.senha = hash;
    next();
})


module.exports = mongoose.model('clientes', clienteSchema)
