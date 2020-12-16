import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo.js'
import NavigationItems from '../NavigationItems/NavigationItems.js';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle.js';

const Toolbar = props => (
    <header className={classes.Toolbar}>
        <DrawerToggle click={props.toggleDrawer} />
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly} >
            <NavigationItems isAuthenticated={props.isAuthenticated} />
        </nav>
    </header>
);

export default Toolbar;