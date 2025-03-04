import React, { Component } from 'react';

const AsyncComponent = doImport => {
    return class extends Component {
        state = {
            component: null
        }

        componentDidMount = () => {
            doImport()
                .then(cmp => {
                    this.setState({ component: cmp.default })
                });
        }

        render() {
            const C = this.state.component;

            return C ? <C {...this.props} /> : null;
        }
    }
}

export default AsyncComponent;