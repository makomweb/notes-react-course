import React, { Component } from 'react';
import Auxiliary from '../Auxiliary/Auxiliary';
import SideDrawer from '../../Components/Navigation/SideDrawer/SideDrawer';
import Toolbar from '../../Components/Navigation/Toolbar/Toolbar.js';
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