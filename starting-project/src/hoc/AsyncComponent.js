import React, { Component } from 'react';

const AsyncComponent = doImport => {
    return class extends Component {
        state = {
            component: null
        }

        componentDidMount = () => {
            doImport()
                .then(component => {
                    this.setState({ component: component })
                });
        }

        render() {
            const { component } = this.state;

            return component ? <component {...this.props} /> : null;
        }
    }
}

export default AsyncComponent;