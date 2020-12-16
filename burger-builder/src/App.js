import React, { Component } from 'react';
import Layout from './HOC/Layout/Layout';
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
import Checkout from './Containers/Checkout/Checkout.js';
import { Route, withRouter } from 'react-router-dom';
import Orders from './Containers/Orders/Orders.js';
import Auth from './Containers/Auth/Auth';
import Logout from './Containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actions from './Store/Actions';

class App extends Component {
  componentDidMount = () => {
    this.props.tryAutoSignup();
  }

  render() {
    return (
      <Layout>
        <Route path="/checkout" component={Checkout} />
        <Route path="/orders" component={Orders} />
        <Route path="/auth" component={Auth} />
        <Route path="/logout" component={Logout} />
        <Route path="/" exact component={BurgerBuilder} />
      </Layout>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    tryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(null, mapDispatchToProps)(App));
