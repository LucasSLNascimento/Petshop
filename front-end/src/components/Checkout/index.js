import { useNavigate, useLocation } from "react-router-dom";
import jwt from 'jwt-decode';
import { useEffect, useState } from "react";
import axios from 'axios';

export default function Checkout() {
    const navigate = useNavigate();
    const [prod, setProd] = useState(null);
    const storedItem = JSON.parse(localStorage.getItem('produtos'));

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/produtos`);
                const data = response.data;
                setProd(data);
                console.log(data)
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    function getProductById(id) {
        return prod.find(item => item._id === id);
    }

    function handleSubmit(event) {
        event.preventDefault();

        const storedToken = localStorage.getItem('token');

        if (storedToken) {
            const data = jwt(storedToken);
            console.log(data);
            alert("Compra efetuada com sucesso para o cliente código: " + data.codigo + ".");
            localStorage.removeItem('produtos');
        } else {
            alert('Usuário não autenticado! Por favor, faça o login!');
            navigate("/logar");
        }
    }

    return (
        <div className="container text-center">
            {!storedItem || !prod? (
                <p>Nenhum produto adicionado ao carrinho</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col">
                            <div className="card">
                                <div className="card-body">
                                    {storedItem.map((item, index) => {
                                        const product = getProductById(item._id);

                                        if (product) {
                                            return (
                                                <div key={index}>
                                                    <h5 className="card-title">{product.nome}</h5>
                                                    <p>Quantidade: {item.quantidade}</p>
                                                    <p>Preço: {product.preco}</p>
                                                </div>
                                            );
                                        } else {
                                            return null; // Produto não encontrado
                                        }
                                    })}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <br />
                                    <p className="lead">
                                        Valor Total do Pedido: R$ {storedItem.reduce((total, item) => {
                                            const product = getProductById(item._id);
                                            return total + (product ? product.preco * item.quantidade : 0);
                                        }, 0)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Finalizar Pedido
                    </button>
                </form>
            )}
        </div>
    );
}