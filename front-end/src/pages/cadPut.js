import React, { useState } from 'react';
import './pages.css';

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
            <div style={{ display: 'flex' }}>
                <div className="form-custom">
                    <form onSubmit={handleSubmit}>
                        <div className='infos_pessoal'>
                            <h5>Dados pessoais</h5>
                            <input className='options' type="text" placeholder='Nome' value={nome} onChange={(e) => { setNome(e.target.value) }} /><br />
                            <input className='options' type="text" placeholder='Endereço' value={endereco} onChange={(e) => { setEndereco(e.target.value) }} /><br />
                            <input className='options' type="text" placeholder='CPF' maxLength='11' value={CPF} onChange={(e) => { setCpf(e.target.value) }} /><br />
                            <input className='options' type="text" placeholder='Telefone' value={telefone} onChange={(e) => { setTelefone(e.target.value) }} />

                        </div>

                        <div className='infosCartao'>
                            <h5>Dados do cartão</h5>
                            <input className='cartao' type="text" value={credNome} onChange={(e) => { setCredNome(e.target.value) }} placeholder='Nome do cartão' /> <br />
                            <input className='cartao' type="text" maxLength='20' value={credNum} onChange={(e) => { setCredNum(e.target.value) }} placeholder='Número do cartão' /> <br />
                            <input className='cartao' type="password" maxLength='3' value={credCvc} onChange={(e) => { setCredCvc(e.target.value) }} placeholder='CVC' />
                        </div>
                        <br />
                        <div className='infosCad'>
                            <input type="email" placeholder='Email' className="form-control" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                            <input type="password" placeholder='Senha' className="form-control" value={senha} onChange={(e) => { setSenha(e.target.value) }} />
                        </div>
                        <div className='foto'>
                            <label>
                                Foto:
                                <input type="file" className="form-control-file" onChange={handleFotoChange} />
                            </label>
                        </div>
                        <br />
                        <button className='submit' type="submit">Cadastrar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}