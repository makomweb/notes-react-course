import React, { Fragment } from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop.js';
import classes from './SideDrawer.css';

const SideDrawer = props => {
    return (
        <Fragment>
            <Backdrop show={props.open} tapped={props.closed} />
            <div className={classes.SideDrawer}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Fragment>
    );
};

export default SideDrawer;