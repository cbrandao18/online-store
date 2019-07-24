import React, { Component } from "react";
import { Route, Switch } from 'react-router-dom';
import ProductIndex from './products/ProductIndex'
import Login from './Login';
import AuthRoute from '../util/route_util';
import Nav from './Nav';
import Register from './Register';

const App = () => {
  return (
    <div>
      <Nav />
      <h1>Online Store</h1>
      <Switch>
        <AuthRoute exact path="/login" component={Login} routeType="auth" />
        <AuthRoute exact path="/register" component={Register} routeType="auth"/>
        <Route path="/" component={ProductIndex} />
      </Switch>
    </div>
  );
};

export default App;
