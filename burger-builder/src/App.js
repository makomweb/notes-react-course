import React, { Component, Suspense } from 'react';
import Layout from './HOC/Layout/Layout';
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './Store/Actions';

const Auth = React.lazy(() => import('./Containers/Auth/Auth'));
const Orders = React.lazy(() => import('./Containers/Orders/Orders'));
const Checkout = React.lazy(() => import('./Containers/Checkout/Checkout'));
const Logout = React.lazy(() => import('./Containers/Auth/Logout/Logout'));

class App extends Component {
  componentDidMount = () => {
    this.props.tryAutoSignup();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" render={() =>
          <Suspense fallback={<div>Loading...</div>}>
            <Auth />
          </Suspense>
        } />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" render={() =>
            <Suspense fallback={<div>Loading...</div>}>
              <Checkout />
            </Suspense>
          } />
          <Route path="/orders" render={() =>
            <Suspense fallback={<div>Loading...</div>}>
              <Orders />
            </Suspense>
          } />
          <Route path="/logout" render={() =>
            <Suspense fallback={<div>Loading...</div>}>
              <Logout />
            </Suspense>
          } />
          <Route path="/auth" render={() =>
            <Suspense fallback={<div>Loading...</div>}>
              <Auth />
            </Suspense>
          } />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <Layout>
        {routes}
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    tryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
