import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

export default function Autentica() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();

        const bodyParam = {
            email: email,
            senha: senha
        };

        fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyParam)
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Erro ao autenticar usuário');
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                alert("Token gerado para o usuário " + data.nome);
                localStorage.setItem('token', data.token);
                navigate('/');
            })
            .catch((error) => {
                console.error(error);
                alert("Ocorreu um erro! " + error.message);
            })
            .finally(() => {
                setEmail("");
                setSenha("");
            });
    }

    return (
        <div className="container text-center">
            <div className="row">
                <div className="form-custom">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>
                                Email:
                                <input type="text" className="form-control" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                            </label>
                        </div>
                        <br />
                        <div className="form-group">
                            <label>
                                Senha:
                                <input type="password" className="form-control" value={senha} onChange={(e) => { setSenha(e.target.value) }} />
                            </label>
                        </div>
                        <br />
                        <div>
                            <Link to={`/cadPut`}>
                                <button type="button">Não possui cadastro?</button>
                            </Link>
                        </div>
                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
}