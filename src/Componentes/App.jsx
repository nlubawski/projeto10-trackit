import GlobalStyle from './../globalStyles'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from "react";
import TelaInicial from './TelaInicial'
import TelaCadastro from './TelaCadastro'
import TelaHabitos from './TelaHabitos'
import TelaHoje from './TelaHoje'
import TelaHistorico from './TelaHistorico'

import UsuarioContext from './contextos/UsuarioContext'

function App(){
    const [usuario, setUsuario] = useState({})
    const [imagem, setImagem] = useState("")
    return (
        <>
        <GlobalStyle />
        <UsuarioContext.Provider  value={{usuario, setUsuario, imagem, setImagem}} >
        <BrowserRouter>
        <Routes>
            <Route path='/' element={<TelaInicial />} />
            <Route path='/cadastro' element={<TelaCadastro />} />
            <Route path='/habitos' element={<TelaHabitos />} />
            <Route path='/hoje' element={<TelaHoje />} />
            <Route path='/historico' element={<TelaHistorico />} />
        </Routes>
        </BrowserRouter>
        </UsuarioContext.Provider>
        </>
    )
}

export default App