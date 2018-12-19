import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../ContactData/ContactData';
import { Route } from 'react-router-dom';

class Checkout extends Component {
    state = {
        ingredients: {
            lettuce: 1,
            patty: 1,
            cheese: 1,
            bacon: 1
        },
        price: 0
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for (let p of query.entries()) {
            // ['letturce', '1']
            if (p[0] === 'price') {
                price = p[1];
            } else {
                ingredients[p[0]] = + p[1];
            }
        }

        this.setState({
            ingredients: ingredients,
            price: price
        });
    }

    checkoutCancelled = () => {
        this.props.history.goBack();
    }

    checkoutContinued = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        console.log("[Checkout.js]", this.props);
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelled}
                    checkoutContinued={this.checkoutContinued}
                />
                <Route path='/checkout/contact-data' render={
                    (props) => (<ContactData ingredients={this.state.ingredients} price={this.state.price} {...props} />)
                } />
            </div>
        );

    }
}

export default Checkout;