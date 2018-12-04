import React, { Component } from 'react';
import Aux from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    componentWillUpdate() {
        console.log("[OrderSummary.jsx] entered componentWillUpdate()");
    }

    render() {
        const summary = Object.keys(this.props.ingredients)
            .map(igKey => {
                return (
                    <li key={igKey}>
                        <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {this.props.ingredients[igKey]}
                    </li>);
            });

        return (
            <Aux>
                <h3>Your order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>{summary}</ul>
                <p><strong>Total price: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue with checkout.</p>
                <Button buttonType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
                <Button buttonType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </Aux>
        );
    }
};

export default OrderSummary;