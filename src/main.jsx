import React from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import { BrowserRouter, RouterProvider } from 'react-router-dom';
import theme from './theme';
import App from './App';
import { AppProvider } from './AppProvider';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme} >
      <CSSReset />
      <AppProvider>
        <BrowserRouter>
          <App/>
        </BrowserRouter>
      </AppProvider>
    </ChakraProvider>
  </React.StrictMode>
);
