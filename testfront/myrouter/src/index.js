import React from 'react';
import ReactDOM from 'react-dom';
import {Route,Link,Switch,BrowserRouter as Router} from 'react-router-dom'
import './index.css';
import App from './App';
import user from "./user"
import visit from './visit';
import notfound from './notfound';

const Routting=(
  <Router>  
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/user" component={user} />
      <Route path="/visit" component={visit} />
      <Route component={notfound} />
    </Switch>
  </Router>
)

ReactDOM.render(
    Routting,
  document.getElementById('root')
);

