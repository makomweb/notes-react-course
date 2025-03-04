import React from 'react';
import classes from './Burger.css';
import Ingredient from './Ingredient/Ingredient.js';
import { withRouter } from 'react-router-dom';

const Burger = props => {
    let ingredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <Ingredient key={igKey + i} type={igKey} />
            });
        })
        .reduce((arr, elem) => {
            return arr.concat(elem);
        }, []);


    if (ingredients.length === 0) {
        ingredients = <p>Please start adding ingredients!</p>
    }

    return (
        <div className={classes.Burger}>
            <Ingredient type="bread-top" />
            {ingredients}
            <Ingredient type="bread-bottom" />
        </div>
    );
}

export default withRouter(Burger);