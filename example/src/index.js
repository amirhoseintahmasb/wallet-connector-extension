import React from 'react';
import ReactDOM from 'react-dom/client';
import WalletProvider from './context/WalletProvider';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <WalletProvider>
            <App />
        </WalletProvider>
    </React.StrictMode>
);