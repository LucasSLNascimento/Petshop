require("./mongodb");
const mongoose = require("mongoose");
const clienteModel = require('../models/clienteModel')
const categoriaModel = require('../models/categoriaModel')

const clientes = require('./cliente.json')
const categorias = require('./categoria.json')

async function carregarDados() {
    try {
        await clienteModel.deleteMany({})
        for (const cliente of clientes) {
            await clienteModel.create(cliente)
        }
        console.log('Carga de clientes concluída')

        await categoriaModel.deleteMany({})
        for(const categoria of categorias){
            await categoriaModel.create(categoria)
        }
        console.log('Carga de categorias concluída')

    } catch (err) {
        console.log(err)
    } finally {
        process.exit()
    }
}

carregarDados()



/*

const pedidoModel = require('../models/pedidoModel')
const produtoMdel = require('../models/produtoModel')


const pedido = require('./pedido.json')
const produto = require('./produto.json')

        await clienteModel.deleteMany({})
        for(const cliente of clientes){
            await clienteModel.create(cliente)
        }
        console.log('Carga de clientes concluída')
*/