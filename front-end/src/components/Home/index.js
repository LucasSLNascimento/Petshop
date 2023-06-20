import { useEffect, useState } from "react";
import Title from '../Titulo';
import { Link } from 'react-router-dom';

export default function Home() {
    const [data, setData] = useState(null)
    const [prod_name, setProd_Name] = useState('')
    const [ordena, setOrdena] = useState('Nome');

    useEffect(() => {
        fetch('http://localhost:3001/produtos')
            .then(response => response.json())
            .then(data => setData(data))
            .catch(err => console.error(err))
    }, [])

    if (!data) {
        return <p>Carregando...</p>
    }

    const handleProdChange = (event) => {
        setProd_Name(event.target.value)
    }
    const busca = data.filter((produto) =>
        produto.nome.toLowerCase().includes(prod_name.toLowerCase())
    )
    const handleOrdChange = (event) => {
        setOrdena(event.target.value);
    }

    data.sort((prod1, prod2) => {
        if (ordena === 'Nome') {
            return prod1.nome.localeCompare(prod2.nome)
        } else if (ordena === 'Menor preco') {
            return prod1.preco - prod2.preco
        } else {
            return prod2.preco - prod1.preco
        }
    })

    return (
        <div className="container text-center">
            <Title title={'Paraíso pet'} text='' />
            <input className="buscador" type="search" name="busca" id="buscaProduto" value={prod_name} onChange={handleProdChange} placeholder="Busca por produtos" />
            <div className='col-sm'>
                <label >Ordenar por</label>
                <select onChange={handleOrdChange} value={ordena}>
                    <option value="Nome">Nome do produto</option>
                    <option value="Menor preco">Menor ao maior preço</option>
                    <option value="Maior preco">Maior ao menor preço</option>
                </select>
            </div>

            <div className="row">
                <div className='row'>
                    {busca.map((produto, i) => (
                        <div key={i}>
                            <div className='col-3'>
                                <div className="card">
                                <img src={`data:image/jpeg;base64,` + btoa(Array.from(produto.imagem.data).map(byte => String.fromCharCode(byte)).join(''))} alt={produto.nome} className="card-img-top" />
                                    <div className="card-body">
                                        <h5 className="card-title">{produto.nome}</h5>
                                        <p>R$ {produto.preco}</p>

                                        <div>
                                            <Link to={`/detalhes/${produto.codigo}`}>
                                                <button type="button">Detalhes</button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
