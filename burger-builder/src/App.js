import React, { Component } from 'react';
import Layout from './HOC/Layout/Layout';
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
import Checkout from './Containers/Checkout/Checkout.js';
import { Route } from 'react-router-dom';
import Orders from './Containers/Orders/Orders.js';
import Auth from './Containers/Auth/Auth';

class App extends Component {
  render() {
    return (
      <Layout>
        <Route path="/checkout" component={Checkout} />
        <Route path="/orders" component={Orders} />
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={BurgerBuilder} />
      </Layout>
    );
  }
}

export default App;
