import React from 'react';
import styles from './Order.css';

const order = (props) => (
    <div className={styles.Order}>
        <p>Ingredients: Lettuce (1)</p>
        <p>Price: <strong>USD 4.5</strong></p>
    </div>
);

export default order;