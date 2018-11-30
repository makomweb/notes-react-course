import React from 'react';
import styles from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    return (
        <div className={styles.Burger}>
            <BurgerIngredient type="bun-top" />
            <BurgerIngredient type="cheese" />
            <BurgerIngredient type="patty" />
            <BurgerIngredient type="bun-bottom" />
        </div>
    );
}

export default burger;