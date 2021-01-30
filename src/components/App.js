import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Header from './Header';
import history from '../history';
import withAuth from './withAuth'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'

const App = () => {
  return (
    <div className="ui container">
      <Router history={history}>
        <div>
          <Header />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <Route path="/profile" component={withAuth(Profile)} />
            {/* <Route path="/profile/:id" exact component={StreamShow} /> */}
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
