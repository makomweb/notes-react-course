import React from 'react';
import classes from './DrawerToggle.css';

const DrawerToggle = props => {
    return (
        <div onClick={props.click}
            className={classes.DrawerToggle}>
            <div />
            <div />
            <div />
        </div>
    );
}

export default DrawerToggle;