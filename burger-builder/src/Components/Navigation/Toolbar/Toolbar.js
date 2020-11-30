import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo.js'
import NavigationItems from '../NavigationItems/NavigationItems.js';

const Toolbar = props => (
    <header className={classes.Toolbar}>
        <div onClick={props.openSideDrawer} className={classes.MenuButton}>
            MENU
        </div>
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly} >
            <NavigationItems />
        </nav>
    </header>
);

export default Toolbar;