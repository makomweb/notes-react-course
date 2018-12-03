import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import styles from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        sideDrawerVisible: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({ sideDrawerVisible: false });
    }

    sideDrawerOpenHandler = () => {
        this.setState({ sideDrawerVisible: true });
    }

    render() {
        return (
            <Aux>
                <Toolbar openSideDrawer={this.sideDrawerOpenHandler} />
                <SideDrawer open={this.state.sideDrawerVisible} closed={this.sideDrawerClosedHandler} />
                <main className={styles.Content}>
                    {this.props.children}
                </main>
            </Aux >
        );
    }
};

export default Layout;