import React from 'react';
import { createRoot } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './features/Navbar/navbar';
import App from './app/App';

const rootElement = document.getElementById('root');

createRoot(rootElement).render(
  <Router>
    <App />
  </Router>
);
