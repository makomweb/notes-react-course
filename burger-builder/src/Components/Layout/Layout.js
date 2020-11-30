import React, { Component } from 'react';
import Auxiliary from '../../HOC/Auxiliary';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import Toolbar from '../Navigation/Toolbar/Toolbar.js';
import classes from './Layout.css';

class Layout extends Component {
    state = {
        sideDrawerVisible: false
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            this.setState({ sideDrawerVisible: !prevState.sideDrawerVisible });
        });
    }

    render() {
        return (
            <Auxiliary>
                <Toolbar toggleDrawer={this.sideDrawerToggleHandler} />
                <SideDrawer open={this.state.sideDrawerVisible} closed={this.sideDrawerToggleHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxiliary>
        );
    }
}

export default Layout;