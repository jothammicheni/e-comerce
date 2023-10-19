import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom/client';
import './custom.scss';
import { UserProvider } from './context/context';

import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<UserProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>
</UserProvider>
);

