import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppShell from './containers/appShell';
import {configureStore} from './containers/appShell/configureStore';

const store = configureStore({});

ReactDOM.render(<Provider store={store}><AppShell /></Provider>, document.getElementById('root'));

