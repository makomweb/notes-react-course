import React from 'react';
import classes from './Order.css';

const Order = props => {
    return (
        <div className={classes.Order}>
            <p>Ingredients: Lettuce (1)</p>
            <p>Price: <strong>USD 5.45</strong></p>
        </div>
    );
}

export default Order;