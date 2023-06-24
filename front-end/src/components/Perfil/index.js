import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from '../Titulo';
import jwtDecode from 'jwt-decode';

export default function Perfil() {
    const [cliente, setCliente] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {

            const decodedToken = jwtDecode(token);
            const clienteId = decodedToken.id;
            const headers = {
                Authorization: clienteId
            };
            fetch(`http://localhost:3001/clientes/${clienteId}`, { headers })
                .then(response => response.json())
                .then(data => {
                    setCliente(data);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, []);

    const logOff = () => {
        localStorage.removeItem('token');
        navigate("/");
    }
    const atualizar = () => {
        const clienteId = cliente.codigo
        navigate(`/atualizar/${clienteId}`);
    }

    return (
        <div>
            {cliente ? (
                <div className="container">
                    <Title title={''} text='Detalhes do cliente' />
                    <div className="row">
                        <div className="col-md-4">
                            <img src={`data:image/jpeg;base64,` + btoa(Array.from(cliente.foto.data).map(byte => String.fromCharCode(byte)).join(''))} alt={cliente.nome} className="card-img-top" />
                        </div>
                        <div className="col-md-8">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Nome: {cliente.nome}</h5>
                                    <p className="card-text">Telefone: {cliente.telefone}</p>
                                    <p className="card-text">Endereço: {cliente.endereco}</p>
                                    <p className="card-text">Email: {cliente.email}</p>
                                </div>
                            </div>
                            <button onClick={logOff}>Log Off</button>
                            <button onClick={atualizar}>Atualizar perfil</button>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Carregando...</p>
            )}
        </div>
    )
}



