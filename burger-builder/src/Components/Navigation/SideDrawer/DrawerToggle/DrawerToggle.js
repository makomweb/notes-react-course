import React from 'react';
import classes from './DrawerToggle.css';

const DrawerToggle = props => {
    return (
        <div onClick={props.click} className={classes.MenuButton}>MENU</div>
    );
}

export default DrawerToggle;