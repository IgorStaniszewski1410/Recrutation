import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import store from './store';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import Login from './views/Login'
import Dashboard from './views/Dashboard'
import Scores from './views/Scores'

import createBrowserHistory from './history'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter history={createBrowserHistory}>
      <MuiThemeProvider>
        <Switch>
          <Provider store={store}>
            <Route exact path="/" component={Login}/>
            <Route exact path="/dashboard" component={Dashboard}/>
            <Route exact path="/scores" component={Scores}/>
          </Provider>
        </Switch>
      </MuiThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
