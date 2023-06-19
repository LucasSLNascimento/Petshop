import { Routes, Route } from 'react-router-dom';

import Home from './pages/home'
import Detalhes from './pages/detalhes'

export default function RoutesConfig(){
    return(
        <Routes>
            <Route path='/' element= {<Home />} />
            <Route path='detalhes/:id' element={<Detalhes />} />
        </Routes>
    )
}