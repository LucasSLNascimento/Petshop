import React from 'react';
import { useEffect, useState } from "react";
import Title from '../components/Titulo';
import { useParams } from 'react-router-dom';

export default function Detalhes() {
    const [data, setData] = useState('');
    const [data2, setData2] = useState('');
    const [quantidade, setQuantidade] = useState(0);
    let { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:3001/produtos/${id}`)
            .then(response => response.json())
            .then(data => setData(data))
            .catch(err => console.error(err))
    }, [id])
    useEffect(() => {
        fetch('http://localhost:3001/categorias')
            .then(response => response.json())
            .then(data2 => setData2(data2))
            .catch(err => console.error(err))
    }, [])

    if (!data) {
        return <p>Carregando...</p>
    }

    const categoria = () => {
        if (data && data2 && data.categoria) {
            const categoriaObj = data2.find((categoria) => categoria.codigo === data.categoria);
            if (categoriaObj) {
                return categoriaObj.nome;
            }
        }
        return '';
    };

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
                        <img src={data.imagem} alt={data.nome} className="card-img-top" />
                    </div>
                    <div className='col-4'>
                        <div className='card'>
                            <div className='card-header'>
                                <p style={{ textAlign: 'center' }}>{categoria()}</p>
                            </div>

                            <div>
                                <p>nome: {data.nome}</p>
                                <p>Descrição: {data.descricao}</p>
                                <p>Preço: R${data.preco}</p>
                                <p>Nota geral: {calcularNotas()}</p>
                                <p>Quantidade no carrinho: {quantidade}</p>
                                <button onClick={carrinho}>Adicionar ao carrinho</button>
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
