import React from 'react';
import BurgerLogo from '../../Assets/images/burger-logo.png';
import classes from './Logo.css';

const Logo = () => (
    <div className={classes.Logo}>
        <img src={BurgerLogo} />
    </div>
);

export default Logo;