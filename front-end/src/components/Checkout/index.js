import { useNavigate, useLocation } from "react-router-dom";
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from "react";
import axios from 'axios';

export default function Checkout() {
    const navigate = useNavigate();
    const [prod, setProd] = useState(null);
    const storedItem = JSON.parse(localStorage.getItem('produtos'));
    const [cliente, setCliente] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/produtos`);
                const data = response.data;
                setProd(data);
                console.log(data)

                const token = localStorage.getItem('token');
                if (token) {
                    const decodedToken = jwtDecode(token);
                    const clienteId = decodedToken.id;
                    const headers = {
                        Authorization: clienteId
                    }
                    const clienteResponse = await axios.get(`http://localhost:3001/clientes/${clienteId}`, { headers });
                    const clienteData = clienteResponse.data;
                    setCliente(clienteData);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    function getProductById(id) {
        return prod.find(item => item._id === id);
    }

    function precoTotal(storedItem, getProductById) {
        return storedItem.reduce((total, item) => {
            const product = getProductById(item._id);
            return total + (product ? product.preco * item.quantidade : 0);
        }, 0);
    }

    function handleSubmit(event) {
        event.preventDefault();

        const storedToken = localStorage.getItem('token');
        console.log(storedToken)

        if (storedToken) {
            const formData = new FormData();
            formData.append('prec_tot', precoTotal(storedItem, getProductById));
            const productIds = storedItem.map(item => item._id);
            productIds.forEach(productId => {
                formData.append('produto', productId);
            });
            formData.append('cliente', storedToken);

            fetch('http://localhost:3001/pedidos', {
                method: 'POST',
                body: formData
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Erro ao criar o pedido');
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log(data);
                    alert("Compra efetuada com sucesso para o cliente código: " + cliente._id + ".");
                    localStorage.removeItem('produtos');
                    navigate("/");
                })

        } else {
            alert('Usuário não autenticado! Por favor, faça o login!');
            navigate("/logar");
        }
    }

    return (
        <div className="container text-center">
            {!storedItem || !prod ? (
                <p>Nenhum produto adicionado ao carrinho</p>
            ) : (
                <form onSubmit={handleSubmit} className="row">

                    <div className="col">
                        <div className="card">
                            <div className="card-body">
                                <h4>Produtos</h4>
                                {storedItem.map((item, index) => {
                                    const product = getProductById(item._id);

                                    if (product) {
                                        return (
                                            <div key={index}>
                                                <h5 className="card-title">{product.nome}</h5>
                                                <p>Quantidade: {item.quantidade}</p>
                                                <p>Preço unitário: {product.preco}</p>
                                            </div>
                                        );
                                    } else {
                                        return null; // Produto não encontrado
                                    }
                                })}
                            </div>
                            <div className="card-footer">
                                <p className="lead">
                                    Valor Total do Pedido: R$ {precoTotal(storedItem, getProductById)}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="card">
                            <div className="card-body">
                                <h4>Detalhes do Cliente</h4>
                                {cliente && (
                                    <div>
                                        <p>Endereço para entrega: {cliente.endereco}</p>
                                        <p>Número do cartão cadastrado: {cliente.credNum}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <button type="submit" className="btn btn-primary">
                                Finalizar Pedido
                            </button>
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
}