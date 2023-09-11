import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import Home from './pages/Home';
import Catalogo from './pages/Catalogo'
import Contato from './pages/Contato'
import AdminPanel from './pages/AdminPanel'
import Details from './pages/Details'
import Login from './pages/Login';

const App = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/catalogo", element: <Catalogo /> },
  { path: "/contato", element: <Contato /> },
  { path: "/login", element: <Login /> },
  { path: "/admin", element: <AdminPanel /> },
  { path: "/details/:id", element: <Details /> },
  { path: "*", element: <div><h1>404</h1></div> },
]);

export default App;
