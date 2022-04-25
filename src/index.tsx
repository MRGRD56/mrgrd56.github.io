import React from 'react';
import 'antd/dist/antd.min.css';
import 'bootstrap/dist/css/bootstrap-utilities.min.css';
import './index.scss';
import App from './App';
import ReactDOM from 'react-dom';

const rootElement = document.getElementById('root') as HTMLElement;
const app = (
    // <React.StrictMode>
    <App />
    // </React.StrictMode>
);

// createRoot(rootElement).render(
//     <React.StrictMode>
//         <App />
//     </React.StrictMode>
// );

ReactDOM.render(app, rootElement);
