require("./mongodb");
const mongoose = require("mongoose");
const clienteModel = require('../models/clienteModel')
const categoriaModel = require('../models/categoriaModel')
const produtoModel = require('../models/produtoModel')

const clientes = require('./cliente.json')
const categorias = require('./categoria.json')
const produtos = require('./produto.json')

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

        await produtoModel.deleteMany({})
        for(const produto of produtos){
            await produtoModel.create(produto)
        }
        console.log('Carga de produtos concluída')

    } catch (err) {
        console.log(err)
    } finally {
        process.exit()
    }
}

carregarDados()



/*

const pedidoModel = require('../models/pedidoModel')


const pedido = require('./pedido.json')


        await clienteModel.deleteMany({})
        for(const cliente of clientes){
            await clienteModel.create(cliente)
        }
        console.log('Carga de clientes concluída')
*/