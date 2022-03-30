import GlobalStyle from './../globalStyles'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TelaInicial from './TelaInicial'
import TelaCadastro from './TelaCadastro'
import TelaHabitos from './TelaHabitos'
import TelaHoje from './TelaHoje'
import TelaHistorico from './TelaHistorico'

function App(){
    return (
        <>
        <GlobalStyle />
        <BrowserRouter>
        <Routes>
            <Route path='/' element={<TelaInicial />} />
            <Route path='/cadastro' element={<TelaCadastro />} />
            <Route path='/habitos' element={<TelaHabitos />} />
            <Route path='/hoje' element={<TelaHoje />} />
            <Route path='/historico' element={<TelaHistorico />} />
        </Routes>
        </BrowserRouter>
        </>
    )
}

export default App