import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Catalogo from './pages/Catalogo'
import Contato from './pages/Contato'
import AdminPanel from './pages/AdminPanel'
import Details from './pages/Details'
import Login from './pages/Login';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/catalogo' element={<Catalogo />} />
      <Route path='/admin' element={<AdminPanel />} />
      <Route path='/contato' element={<Contato />} />
      <Route path='/login' element={<Login />} />
      <Route path='/details/:id' element={<Details />} />
      <Route path='*' element={<h1>404</h1>} />
    </Routes>
  )
}

export default App;
