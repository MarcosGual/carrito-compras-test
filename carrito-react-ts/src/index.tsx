import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query'

const cliente = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={cliente}>
    <App />
  </QueryClientProvider>,
  document.getElementById('root')
);