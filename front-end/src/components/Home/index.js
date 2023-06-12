import { useEffect, useState } from "react";

export default function Home() {
    const [data, setData] = useState(null)
    const [prod_name, setProd_Name] = useState('')
    const [ordena, setOrdena] = useState('Nome');

    useEffect(() => {
        fetch('')
            .then(response => response.json())
            .then(data => setData(data))
            .catch(err => console.error(err))
    }, [])

    if (!data) {
        return <p>Carregando...</p>
    }

    const handleProdChange = (event) => {
        setOrdena(event.target.value)
    }
    const busca = data.filter((produto) => {
        produto.nome.toLowerCase().includes(prod_name.toLowerCase)
    })
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
            <input className="buscador" type="search" name="busca" id="buscaProduto" value={prod_name} onChange={handleProdChange} placeholder="Busca por produtos aqui" />
            <div class='col-sm'>
                <label >Ordenar por</label>
                <select onChange={handleOrdChange} value={ordena}>
                    <option value="Nome">Nome do produto</option>
                    <option value="Menor preco">Menor ao maior preço</option>
                    <option value="Maior preco">Maior ao menor preço</option>
                </select>
            </div>
        </div>
    )
}