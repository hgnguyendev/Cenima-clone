import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { GenresProvider } from './component/context/General';

import Modal from 'react-modal';
import { SearchProvider } from './context/Search.context';
Modal.setAppElement('#root');
const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const queryCline = new QueryClient();
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <SearchProvider>
                <QueryClientProvider client={queryCline}>
                    <GenresProvider>
                        <App />
                    </GenresProvider>
                </QueryClientProvider>
            </SearchProvider>
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
