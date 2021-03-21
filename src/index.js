import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TheGame from './TheGame';
import store from './store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <TheGame />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your store to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
