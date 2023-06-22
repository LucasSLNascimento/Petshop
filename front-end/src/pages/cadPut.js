import React, { useState } from 'react';

export default function CadPut() {
    const [nome, setNome] = useState('');
    const [foto, setFoto] = useState(null);
    const [endereco, setEndereco] = useState('');
    const [telefone, setTelefone] = useState('');
    const [CPF, setCpf] = useState('');
    const [credNome, setCredNome] = useState('');
    const [credNum, setCredNum] = useState('');
    const [credCvc, setCredCvc] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleFotoChange = (event) => {
        const file = event.target.files[0];
        setFoto(file);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('foto', foto);
        formData.append('nome', nome);
        formData.append('endereco', endereco);
        formData.append('telefone', telefone);
        formData.append('CPF', CPF);
        formData.append('credNome', credNome);
        formData.append('credNum', credNum);
        formData.append('credCvc', credCvc);
        formData.append('email', email);
        formData.append('senha', senha);

        fetch('http://localhost:3001/clientes', {
            method: 'POST',
            body: formData
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Erro ao criar usuário');
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                alert("O usuário " + data.codigo + " foi criado com sucesso!");
            })
            .catch((error) => {
                console.error(error);
                alert("Ocorreu um erro! Veja no console..");
            })
            .finally(() => {
                setNome("")
                setFoto(null)
                setEndereco("")
                setTelefone("")
                setCpf("")
                setCredNome("")
                setCredNum("")
                setCredCvc("")
                setEmail("")
                setSenha("")
            })
    }

    return (
        <div className="container text-center">
            <div className="row">
                <div className="form-custom">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>
                                Nome:
                                <input type="text" className="form-control" value={nome} onChange={(e) => { setNome(e.target.value) }} />
                            </label>
                        </div>
                        <br />
                        <div className="form-group">
                            <label>
                                Endereço:
                                <input type="text" className="form-control" value={endereco} onChange={(e) => { setEndereco(e.target.value) }} />
                            </label>
                        </div>
                        <br />
                        <div className="form-group">
                            <label>
                                CPF:
                                <input type="text" maxLength='11' className="form-control" value={CPF} onChange={(e) => { setCpf(e.target.value) }} />
                            </label>
                        </div>
                        <br />
                        <div className="form-group">
                            <label>
                                Telefone:
                                <input type="text" className="form-control" value={telefone} onChange={(e) => { setTelefone(e.target.value) }} />
                            </label>
                        </div>
                        <br />
                        <div>
                            <h5>Dados do cartão</h5>
                            <input className='cartao' type="text" value={credNome} onChange={(e) => { setCredNome(e.target.value) }} placeholder='Nome do cartão' /> <br />
                            <input className='cartao' type="text" maxLength='20' value={credNum} onChange={(e) => { setCredNum(e.target.value) }} placeholder='Número do cartão' /> <br />
                            <input className='cartao' type="password" maxLength='3' value={credCvc} onChange={(e) => { setCredCvc(e.target.value) }} placeholder='CVC' />
                        </div>
                        <br />
                        <div className="form-group">
                            <label>
                                Email:
                                <input type="email" className="form-control" value={email} onChange={(e) => { setEmail(e.target.value) }} />
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
                        <div className="form-group">
                            <label>
                                Foto:
                                <input type="file" className="form-control-file" onChange={handleFotoChange} />
                            </label>
                        </div>
                        <br />
                        <button type="submit" className="btn btn-primary">Cadastrar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}