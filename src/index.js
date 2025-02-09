import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom"
import './index.css';
import App from './components/App';
import {PrimeReactProvider} from "primereact/api";
import {Provider} from "react-redux"
import store from "./store"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <PrimeReactProvider>
                <Provider store={store}>
                    <App/>
                </Provider>
            </PrimeReactProvider>
        </BrowserRouter>
    </React.StrictMode>
);

