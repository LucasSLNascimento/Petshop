import { Routes, Route } from 'react-router-dom';

import Home from './pages/home'
import Detalhes from './pages/detalhes'
import Login from './pages/login'
import CadPut from './pages/cadPut'
import Perfil from './pages/perfil'
import Pedido from './pages/Pedido';

export default function RoutesConfig(){
    return(
        <Routes>
            <Route path='/' element= {<Home />} />
            <Route path='detalhes/:id' element={<Detalhes />} />
            <Route path='logar' element={<Login />} />
            <Route path='cadPut' element={<CadPut />} />
            <Route path='Perfil' element={<Perfil />} />
            <Route path='carrinho' element={<Pedido />} />
            <Route path='*' element={<h1> 404 - Página Não Encontrada!</h1>} />
        </Routes>
    )
}