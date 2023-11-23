import React from 'react';
import ReactDOM from 'react-dom/client'; 
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

    localStorage.setItem('isLogged',JSON.stringify(false))
localStorage.setItem('authTok',JSON.stringify(""))

root.render(
  <BrowserRouter>
   
      <App />
   
  </BrowserRouter>
);
