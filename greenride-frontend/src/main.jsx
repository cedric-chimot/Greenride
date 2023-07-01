import './app/assets/styles/index.css';
import 'react-toastify/dist/ReactToastify.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './app/App';
import { store } from './app/redux-store/store';

import { Helmet } from "react-helmet";
import { URL_FRONT } from './app/constants/urls/urlFrontEnd';

ReactDOM.render(
    <React.StrictMode>
            <Provider store={store}>
                <Helmet>
                    <meta charSet="utf-8" />
                    <link rel="icon" href={`${URL_FRONT}/src/app/assets/img/tabicon.png`} />
                </Helmet>
                <App />
            </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);
