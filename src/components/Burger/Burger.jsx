import React from 'react';
import styles from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {

    let ingredients = props.ingredients;

    // convert the composite object (key + value) into an array of ingredient components
    const burgerIngredients = Object.keys(ingredients)
        .map(ingredientKey => {
            return [...Array(ingredients[ingredientKey])].map((_, i) => {
                return <BurgerIngredient key={ingredientKey + i} type={ingredientKey} />
            });
        });

    return (
        <div className={styles.Burger}>
            <BurgerIngredient type="bun-top" />
            {burgerIngredients}
            <BurgerIngredient type="bun-bottom" />
        </div>
    );
}

export default burger;