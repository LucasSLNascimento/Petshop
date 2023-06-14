require("./mongodb");
const mongoose = require("mongoose");
const clienteModel = require('../models/clienteModel')

const clientes = require('./cliente.json')

async function carregarDados() {
    try {
        await clienteModel.deleteMany({})
        for (const cliente of clientes) {
            await clienteModel.create(cliente)
        }
        console.log('Carga de clientes concluída')

    } catch (err) {
        console.log(err)
    } finally {
        process.exit()
    }
}

carregarDados()



/*
const categoriaModel = require('../models/categoriaModel')
const pedidoModel = require('../models/pedidoModel')
const produtoMdel = require('../models/produtoModel')

const categoria = require('./categoria.json')
const pedido = require('./pedido.json')
const produto = require('./produto.json')


        await categoriaModel.deleteMany({})
        for(const categoria of categorias){
            await categoriaModel.create(categoria)
        }
        console.log('Carga de categorias concluída')

        await clienteModel.deleteMany({})
        for(const cliente of clientes){
            await clienteModel.create(cliente)
        }
        console.log('Carga de clientes concluída')
*/