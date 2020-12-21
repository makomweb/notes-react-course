import React, { Component } from 'react';
import Users from './containers/Users';
import AsyncComponent from './hoc/AsyncComponent';

const AsyncPizza = AsyncComponent(() => {
    return import('./containers/Pizza');
});

class App extends Component {
    render() {
        return (
            <div>
                <div>
                    <Link to="/">Users</Link>
                    <Link to="/pizza">Pizza</Link>
                </div>
                <div>
                    <Route path="/" exact component={Users} />
                    <Route path="/pizza" component={AsyncPizza} />
                </div>
            </div>
        );
    }
}

export default App;