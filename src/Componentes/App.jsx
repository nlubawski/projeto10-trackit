import GlobalStyle from './../globalStyles'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from "react";
import TelaInicial from './TelaInicial'
import TelaCadastro from './TelaCadastro'
import TelaHabitos from './TelaHabitos'
import TelaHoje from './TelaHoje'
import TelaHistorico from './TelaHistorico'

function App(){
    const [token, setToken] = useState(null)
    return (
        <>
        <GlobalStyle />
        <BrowserRouter>
        <Routes>
            <Route path='/' element={<TelaInicial salvarToken={(token) => setToken(token) } />} />
            <Route path='/cadastro' element={<TelaCadastro />} />
            <Route path='/habitos' element={<TelaHabitos />} />
            <Route path='/hoje' element={<TelaHoje token={token} />} />
            <Route path='/historico' element={<TelaHistorico />} />
        </Routes>
        </BrowserRouter>
        </>
    )
}

export default App