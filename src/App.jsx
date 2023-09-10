import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import Home from './pages/Home';
import Catalogo from './pages/Catalogo'
import Contato from './pages/Contato'
import AdminPanel from './pages/AdminPanel'

const App = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/catalogo", element: <Catalogo /> },
  { path: "/contato", element: <Contato /> },
  { path: "/admin", element: <AdminPanel /> },
  { path: "*", element: <div><h1>404</h1></div> },
]);

export default App;
