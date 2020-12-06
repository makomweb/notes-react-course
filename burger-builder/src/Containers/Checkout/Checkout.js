import React, { Component } from 'react';
import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary.js';

class Checkout extends Component {
    state = {
        ingredients: {
            lettuce: 1,
            cheese: 1,
            bacon: 1,
            beef: 1
        }
    }

    onCheckoutCancelled = () => {
        this.props.history.goBack();
    }

    onCheckoutContinue = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    cancel={this.onCheckoutCancelled}
                    continue={this.onCheckoutContinue} />
            </div>
        );
    }
}

export default Checkout;