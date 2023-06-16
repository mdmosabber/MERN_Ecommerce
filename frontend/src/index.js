import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./assets/css/style.css";
import 'bootstrap/dist/css/bootstrap.css';
import { CartProvider } from './context/card';
import { AuthProvider } from './context/auth';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider> 
          <App />
      </CartProvider> 
    </AuthProvider>

  </React.StrictMode>
);



