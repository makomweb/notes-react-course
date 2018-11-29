import React, { Component } from 'react';
import Layout from './components/layout/Layout';
import BurgerBulder from './containers/BurgerBuilder/BurgerBuilder';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <BurgerBulder/>
        </Layout>
      </div>
    );
  }
}

export default App;
