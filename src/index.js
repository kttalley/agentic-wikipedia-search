import React from 'react';
import ReactDOM from 'react-dom/client';
import { SearchProvider } from './contexts/SearchContext';
import App from './App';
import './styles/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SearchProvider>
      <App />
    </SearchProvider>
  </React.StrictMode>
);