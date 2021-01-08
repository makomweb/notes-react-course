import React from 'react';
import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary.js';
import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData.js';
import { connect } from 'react-redux';

const Checkout = props => {
    const { history } = props;
    const onCheckoutCancelled = () => {
        history.goBack();
    }

    const onCheckoutContinue = () => {
        history.replace('/checkout/contact-data');
    }

    const canCheckout = () => {
        const { ingr, purchased } = props;
        if (purchased) {
            return false;
        }

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

    let summary = <Redirect to="/" />
    if (canCheckout()) {
        summary = (
            <div>
                <CheckoutSummary
                    ingredients={props.ingr}
                    cancel={onCheckoutCancelled}
                    continue={onCheckoutContinue} />
                <Route path={props.match.path + '/contact-data'}
                    component={ContactData} />
            </div>
        );
    }

    return summary;
}

const mapStateToProps = state => {
    return {
        ingr: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    };
}

export default connect(mapStateToProps)(Checkout);