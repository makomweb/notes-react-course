import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {
    const { isAuthenticated } = props;
    let authButton = null;
    if (!isAuthenticated) {
        authButton = <NavigationItem link="/auth">Authenticate</NavigationItem>;
    }
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" exact>Burger Builder</NavigationItem>
            <NavigationItem link="/orders">Orders</NavigationItem>
            {authButton}
        </ul>
    );
}

export default navigationItems;