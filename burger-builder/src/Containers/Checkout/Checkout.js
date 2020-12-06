import React, { Component } from 'react';
import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary.js';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData.js';

class Checkout extends Component {
    state = {
        ingredients: {
            lettuce: 1,
            cheese: 1,
            bacon: 1,
            beef: 1
        }
    }

    componentDidMount = () => {
        const query = new URLSearchParams(this.props.location.search);

        const ingredients = {};
        for (let param of query.entries()) {
            // ['lettuce', '1']
            ingredients[param[0]] = +param[1];
        }

        this.setState({ ingredients: ingredients });
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
                <Route path={this.props.match.path + '/contact-data'}
                    component={ContactData} />
            </div>
        );
    }
}

export default Checkout;