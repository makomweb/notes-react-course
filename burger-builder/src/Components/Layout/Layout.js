import React, { Component } from 'react';
import Auxiliary from '../../HOC/Auxiliary';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import Toolbar from '../Navigation/Toolbar/Toolbar.js';
import classes from './Layout.css';

class Layout extends Component {
    state = {
        sideDrawerVisible: true
    }

    sideDrawerClosedHandler = () => {
        this.setState({ sideDrawerVisible: false });
    }

    render() {
        return (
            <Auxiliary>
                <Toolbar />
                <SideDrawer open={this.state.sideDrawerVisible} closed={this.sideDrawerClosedHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxiliary>
        );
    }
}

export default Layout;