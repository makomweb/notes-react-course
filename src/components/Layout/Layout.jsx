import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import styles from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    render() {
        return (
            <Aux>
                <Toolbar />
                <SideDrawer />
                <main className={styles.Content}>
                    {this.props.children}
                </main>
            </Aux >
        );
    }
};

export default Layout;