import { useEffect, useState } from "react";
import Title from '../Titulo';
import jwtDecode from 'jwt-decode';

export default function Perfil() {
    const [cliente, setCliente] = useState(null);

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

    return (
        <div>
            {cliente ? (
                <div>
                    <h2>Detalhes do Cliente</h2>
                    <p>Nome: {cliente.nome}</p>
                    <p>Email: {cliente.email}</p>
                    {/* Mostrar outros detalhes do cliente */}
                </div>
            ) : (
                <p>Carregando...</p>
            )}
        </div>
    )
}



