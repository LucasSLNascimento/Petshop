import React from 'react';
import { useEffect, useState } from "react";
import Title from '../components/Titulo';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function Detalhes() {
    const [data, setData] = useState(null)
    const [quantidade, setQuantidade] = useState(1)
    let { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response1 = await axios.get(`http://localhost:3001/produtos/${id}`);
                const data1 = response1.data;

                const response2 = await axios.get('http://localhost:3001/categorias');
                const categorias = response2.data;

                const categoriaEncontrada = categorias.find(categoria => categoria._id === data1.categoria);
                data1.categoria = categoriaEncontrada;

                setData(data1); // Atualiza o estado com os dados recebidos

            } catch (error) {
                console.error(error);
            }
        };

        fetchData(); // Chama a função de busca de dados assíncrona
    }, []);

    if (!data) {
        return <p>Carregando...</p>
    }

    const calcularNotas = () => {
        if (data.coments && data.coments.length > 0) {
            let notas = 0
            data.coments && data.coments.map((comentario, i) => (
                notas = notas + comentario.nota
            ))
            const mediaNotas = notas / data.coments.length
            return mediaNotas.toFixed(2); // Arredonda para 2 casas decimais
        }
        return 0; // Retorna 0 caso não haja comentários
    };

    const adicionarAoCarrinho = () => {
        const produto = {
            _id: data._id,
            quantidade: quantidade
        };

        const produtosNoCarrinho = JSON.parse(localStorage.getItem('produtos')) || [];
        produtosNoCarrinho.push(produto);
        localStorage.setItem('produtos', JSON.stringify(produtosNoCarrinho));
        alert('Produto adicionado ao carrinho')
        const storedItem = localStorage.getItem('produtos');
        console.log(storedItem)
    };

    const carrinho = () => {
        setQuantidade(quantidade + 1);
        return quantidade
    }

    return (
        <div>
            <Title
                title={"Detalhes"}
                text="Detalhes do produto selecionado" />
            <div className="container">

                <div className='row' style={{ border: '1px solid #d3d3d3' }}>
                    <div className='col-6' >
                        <img src={`data:image/jpeg;base64,` + btoa(Array.from(data.imagem.data).map(byte => String.fromCharCode(byte)).join(''))} alt={data.nome} className="card-img-top" />
                    </div>
                    <div className='col-4'>
                        <div className='card'>
                            <div className='card-header'>
                                <p style={{ textAlign: 'center' }}>{data.categoria.nome}</p>
                            </div>

                            <div>
                                <p>nome: {data.nome}</p>
                                <p>Descrição: {data.descricao}</p>
                                <p>Preço: R${data.preco}</p>
                                <p>Nota geral: {calcularNotas()}</p>
                                <p>Quantidade a ir para o carrinho: {quantidade}</p>
                                <button onClick={carrinho}>Adicionar mais um item</button> <br />
                                <button onClick={adicionarAoCarrinho}>Adicionar ao carrinho</button>    
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="container" style={{ border: '1px solid #d3d3d3' }}>
                {data.coments && data.coments.map((comentario, i) => (
                    <p key={i}>Comentário: {comentario.comentario} Nota: {comentario.nota}</p>
                ))}
            </div>
        </div>
    )
}
