import React from 'react';
import 'antd/dist/antd.min.css';
import 'bootstrap/dist/css/bootstrap-utilities.min.css';
import './index.scss';
import App from './App';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root') as Element);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
