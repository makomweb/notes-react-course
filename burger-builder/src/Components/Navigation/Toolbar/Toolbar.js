import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo.js'
import NavigationItems from '../NavigationItems/NavigationItems.js';

const Toolbar = () => (
    <header className={classes.Toolbar}>
        <div>
            MENU
        </div>
        <Logo height="80%" />
        <nav>
            <NavigationItems />
        </nav>
    </header>
);

export default Toolbar;