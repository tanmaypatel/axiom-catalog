import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'babel-polyfill';

import store from './store';

import App from './app/app';

import '../node_modules/semantic-ui-css/semantic.min.css';
import './index.scss';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
