import React from 'react';
import Auxiliary from '../../../HOC/Auxiliary/Auxiliary.js';
import Button from '../../UI/Button/Button.js';

const OrderSummary = props => {
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
            <p><strong>Total price: {props.price.toFixed(2)}</strong></p>
            <p>Continue with checkout.</p>
            <Button buttonType="Danger" clicked={props.cancelled}>CANCEL</Button>
            <Button buttonType="Success" clicked={props.continue}>CONTINUE</Button>
        </Auxiliary>
    );
}

export default OrderSummary;