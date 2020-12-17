import React, { Fragment } from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop.js';
import classes from './SideDrawer.css';
import { connect } from 'react-redux';

const SideDrawer = props => {
    const attachedClasses = [classes.SideDrawer];
    attachedClasses.push(props.open ? classes.Open : classes.Close);

    return (
        <Fragment>
            <Backdrop show={props.open} tapped={props.closed} />
            <div className={attachedClasses.join(' ')}
                onClick={props.closed}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuthenticated={props.isAuthenticated} />
                </nav>
            </div>
        </Fragment>
    );
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(SideDrawer);