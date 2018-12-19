import React from 'react';
import styles from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import { withRouter } from 'react-router-dom';

const burger = (props) => {
    console.log("[Burger.js] burger()");
    console.log(props);
    let ingredients = props.ingredients;

    // convert the composite object (key + value) into an array of ingredient components
    let burgerIngredients = Object.keys(ingredients)
        .map(ingredientKey => {
            return [...Array(ingredients[ingredientKey])].map((_, i) => {
                return <BurgerIngredient key={ingredientKey + i} type={ingredientKey} />
            });
        })
        // This is to ensure an empty array is returned if there are no ingredients.
        .reduce((array, element) => {
            return array.concat(element);
        }, []);

    if (burgerIngredients.length === 0) {
        burgerIngredients = <p>Please start adding ingredients!</p>
    }

    return (
        <div className={styles.Burger}>
            <BurgerIngredient type="bun-top" />
            {burgerIngredients}
            <BurgerIngredient type="bun-bottom" />
        </div>
    );
}

export default withRouter(burger);