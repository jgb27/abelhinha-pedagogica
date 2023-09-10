import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import { RouterProvider } from 'react-router-dom';
import theme from './theme';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <CSSReset />
      <RouterProvider router={App} />
    </ChakraProvider>
  </React.StrictMode>
);
