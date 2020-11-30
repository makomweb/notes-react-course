import React from 'react';
import BurgerLogo from '../../Assets/images/burger-logo.png';
import classes from './Logo.css';

const Logo = props => (
    <div className={classes.Logo} style={{ height: props.height }}>
        <img src={BurgerLogo} alt="MyBurger" />
    </div>
);

export default Logo;