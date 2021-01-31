import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Header from './Header';
import history from '../history';
import withAuth from './withAuth'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import UserProfile from './pages/UserProfile'
import Post from './pages/Post'

const App = () => {
  return (
    <div className="ui container">
      <Router history={history}>
        <div>
          <Header />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/post" exact component={Post} />
            <Route path="/login" exact component={Login} />
            <Route path="/profile" component={withAuth(Profile)} />
            <Route path="/userProfile/:id" exact component={UserProfile} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
