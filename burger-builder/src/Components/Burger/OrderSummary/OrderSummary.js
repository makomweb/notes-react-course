import React from 'react';
import Auxiliary from '../../../HOC/Auxiliary.js';

const OrderSummary = (props) => {
    const summary = Object.keys(props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {props.ingredients[igKey]}
                </li>);
        });

    return (
        <Auxiliary>
            <h3>Your order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>{summary}</ul>
            <p>Continue with checkout.</p>
            <button>CANCEL</button>
            <button>CONTINUE</button>
        </Auxiliary>
    );
}

export default OrderSummary;