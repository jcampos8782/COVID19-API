import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import configureStore from './store';

import './styles/index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import './styles/font-awesome/5.13.0/css/all.min.css';

ReactDOM.render(
    <Provider store={configureStore()}>
        <App defaultRegionName="United States" />
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
