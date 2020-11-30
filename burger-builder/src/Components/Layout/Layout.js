import React, { Component } from 'react';
import Auxiliary from '../../HOC/Auxiliary';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import Toolbar from '../Navigation/Toolbar/Toolbar.js';
import classes from './Layout.css';

class Layout extends Component {
    render() {
        return (
            <Auxiliary>
                <Toolbar />
                <SideDrawer />
                <main className={classes.Content}>
                    {props.children}
                </main>
            </Auxiliary>
        );
    }
}

export default Layout;