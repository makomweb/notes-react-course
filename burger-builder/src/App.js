import React, { useEffect, Suspense } from 'react';
import Layout from './HOC/Layout/Layout';
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './Store/Actions';

const AsyncAuth = React.lazy(() => {
  return import('./Containers/Auth/Auth');
});

const AsyncCheckout = React.lazy(() => {
  return import('./Containers/Checkout/Checkout');
});

const AsyncOrders = React.lazy(() => {
  return import('./Containers/Orders/Orders');
});

const AsyncLogout = React.lazy(() => {
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
      <Suspense fallback={<p>Loading...</p>}>
        {routes}
      </Suspense>
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
