import React from 'react';
import { createRoot } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './app/App';

const rootElement = document.getElementById('root');

createRoot(rootElement).render(
  <Router>
    <App />
  </Router>
);
