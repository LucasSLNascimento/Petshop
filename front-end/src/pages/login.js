import React from 'react';
import Title from './../components/Titulo/index';
import Autentica from '../components/Autentca/index';

export default function Login(){
    return(
        <div>
            <Title
                title={"Login"}
                text={"Faça seu login para concluir a compra"} />
            <Autentica />
        </div>
    )
}