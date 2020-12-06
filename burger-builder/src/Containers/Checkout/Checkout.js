import React, { Component } from 'react';
import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary.js';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData.js';

class Checkout extends Component {
    state = {
        ingredients: null,
        price: 0
    }

    componentWillMount = () => {
        const query = new URLSearchParams(this.props.location.search);

        const ingredients = {};
        let price = 0;
        for (let param of query.entries()) {
            // ['lettuce', '1']

            if (param[0] === 'price') {
                price = param[1];
            }
            else {
                ingredients[param[0]] = +param[1];
            }
        }

        this.setState({ ingredients: ingredients });
        this.setState({ price: price });
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
                    render={() => {
                        return <ContactData ingredients={this.state.ingredients} />;
                    }} />
            </div>
        );
    }
}

export default Checkout;