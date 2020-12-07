import React from 'react';
import classes from './Order.css';

const Order = props => {
    /*
    let ingredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <Ingredient key={igKey + i} type={igKey} />
            });
        })
        .reduce((arr, elem) => {
            return arr.concat(elem);
        }, []);
    */

    const ingredients = [];

    for (let iName in props.ingredients) {
        ingredients.push({
            name: iName,
            amount: props.ingredients[iName]
        });
    }

    const ingredientsOutput = ingredients.map(ig => {
        return (
            <span key={ig.name}
                style={{
                    textTransform: 'capitalize',
                    display: 'inline-block',
                    margin: '0 8px',
                    border: '1px solid #ccc',
                    padding: '5px'
                }}>
                {ig.name} ({ig.amount})
            </span>
        );
    })

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientsOutput}</p>
            <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    );
}

export default Order;