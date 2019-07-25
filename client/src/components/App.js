import React from "react";
import { Route, Switch } from 'react-router-dom';
import ProductIndex from './products/ProductIndex'
import ProductDetail from './products/ProductDetail'
import ProductCreate from './products/CreateProduct'
import Cart from './products/Cart';
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
        <Route exact path="/" component={ProductIndex} />
        <Route exact path="/products/create" component={ProductCreate} />
        <Route exact path="/products/:id" component={ProductDetail} />
        <Route exact path="/cart" component={Cart} />
      </Switch>
    </div>
  );
};

export default App;
