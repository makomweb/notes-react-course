import React, { useEffect } from 'react';
import Layout from './HOC/Layout/Layout';
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './Store/Actions';
import AsyncComponent from './HOC/Async/AsyncComponent';

const AsyncAuth = AsyncComponent(() => {
  return import('./Containers/Auth/Auth');
});

const AsyncCheckout = AsyncComponent(() => {
  return import('./Containers/Checkout/Checkout');
});

const AsyncOrders = AsyncComponent(() => {
  return import('./Containers/Orders/Orders');
});

const AsyncLogout = AsyncComponent(() => {
  return import('./Containers/Auth/Logout/Logout');
});

const App = props => {
  useEffect(() => {
    props.tryAutoSignup();
  }, []);

  let routes = (
    <Switch>
      <Route path="/auth" component={AsyncAuth} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/checkout" component={AsyncCheckout} />
        <Route path="/orders" component={AsyncOrders} />
        <Route path="/logout" component={AsyncLogout} />
        <Route path="/auth" component={AsyncAuth} />
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
