import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router , Route , Link, Switch  } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory'
import { createStore } from 'redux';
import './index.css';
import reducer from './Reducers';
import Routes from './Routes';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(reducer);
const history = createBrowserHistory();

ReactDOM.render(
  <Provider store={store} >
    <Router history={history}>
      <Routes />
    </Router>
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
