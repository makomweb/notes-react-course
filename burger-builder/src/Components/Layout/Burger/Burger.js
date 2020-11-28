import React from 'react';
import classes from './Burger.css';
import Ingredient from './Ingredient/Ingredient.js';

const Burger = props => {
    return (
        <div className={classes.Burger}>
            <Ingredient type="bread-top" />
            <Ingredient type="cheese" />
            <Ingredient type="beef" />
            <Ingredient type="bread-bottom" />
        </div>
    );
}

export default Burger;