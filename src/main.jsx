import React from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import { RouterProvider } from 'react-router-dom';
import theme from './theme';
import App from './App';
import { AppProvider } from './AppProvider';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme} >
      <CSSReset />
      <AppProvider>
        <RouterProvider router={App} />
      </AppProvider>
    </ChakraProvider>
  </React.StrictMode>
);
