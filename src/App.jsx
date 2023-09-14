import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Catalogo from './pages/Catalogo'
import Contato from './pages/Contato'
import AdminPanel from './pages/AdminPanel'
import UserPanel from './pages/UserPanel'
import Details from './pages/Details'
import Login from './pages/Login';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/catalogo' element={<Catalogo />} />
      <Route path='/admin' element={<AdminPanel />} />
      <Route path='/user' element={<UserPanel />} />
      <Route path='/contato' element={<Contato />} />
      <Route path='/login' element={<Login />} />
      <Route path='/details/:id' element={<Details />} />
      <Route path='*'
        element={
          <NotFound
            title='Página não encontrada'
            text='A página que você está procurando não existe.'
            isRedirect={
              {
                copy: 'Não perca a viagem, acesse nosso catálogo',
                toRedirect: 'catalogo'
              }
            }
          />
        }
      />
    </Routes>
  )
}

export default App;
