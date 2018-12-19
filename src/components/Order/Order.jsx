import React from 'react';
import styles from './Order.css';

const order = (props) => (
    <div className={styles.Order}>
        <p>Ingredients: Lettuce (1)</p>
        <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
    </div>
);

export default order;