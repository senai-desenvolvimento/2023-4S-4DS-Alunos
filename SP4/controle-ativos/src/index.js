import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { RoutesPages } from './Routes/routes';
import Painel from './Pages/Painel';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RoutesPages />
    {/* <Painel /> */}
  </React.StrictMode>
);