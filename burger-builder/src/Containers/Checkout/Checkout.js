import React, { Component } from 'react';
import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary.js';
import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData.js';
import { connect } from 'react-redux';

class Checkout extends Component {
    onCheckoutCancelled = () => {
        this.props.history.goBack();
    }

    onCheckoutContinue = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    canCheckout() {
        if (this.props.purchased) {
            return false;
        }

        const { ingr } = this.props;

        if (ingr) {
            const sum = Object.keys(ingr)
                .map(key => {
                    return ingr[key];
                })
                .reduce((acc, element) => {
                    return acc + element;
                }, 0);

            return sum > 0;
        }

        return false;
    }

    render() {
        let summary = <Redirect to="/" />
        if (this.canCheckout()) {
            summary = (
                <div>
                    <CheckoutSummary
                        ingredients={this.props.ingr}
                        cancel={this.onCheckoutCancelled}
                        continue={this.onCheckoutContinue} />
                    <Route path={this.props.match.path + '/contact-data'}
                        component={ContactData} />
                </div>
            );
        }

        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ingr: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    };
}

export default connect(mapStateToProps)(Checkout);