import React from 'react';
import styles from './Order.css';

const order = (props) => {
    const ingredients = [];
    for (let ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        });
    }

    return (
        <div className={styles.Order}>
            <ul>
                {ingredients.map(i => <li><p>{i.name} ({i.amount})</p></li>)}
            </ul>
            <p>Price: <strong>USD {props.price.toFixed(2)}</strong></p>
        </div>
    );
}

export default order;