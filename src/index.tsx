import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/config.store';

const client = new QueryClient()

const html = document.getElementById('root') as HTMLElement
const root = createRoot(html)
root.render(
  <React.StrictMode>
    <QueryClientProvider client={client} >
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
)