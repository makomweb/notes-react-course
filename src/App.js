import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

class App extends Component {
  state = {
    show: true
  }

  toggleHandler = () => {
    this.setState({ show: !this.state.show })
  }

  render() {
    return (
      <div>
        <Layout>
          {this.state.show ? <BurgerBuilder /> : null}
        </Layout>
        <button onClick={this.toggleHandler}>Toggle</button>
      </div>
    );
  }
}

export default App;
