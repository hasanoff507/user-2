import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import '@splidejs/react-splide/css';
import '@splidejs/react-splide/css/core';
import App from './App';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


