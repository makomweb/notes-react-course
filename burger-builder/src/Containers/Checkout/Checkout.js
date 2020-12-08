import React, { Component } from 'react';
import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary.js';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData.js';
import { connect } from 'react-redux';

class Checkout extends Component {

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
                    ingredients={this.props.ingr}
                    cancel={this.onCheckoutCancelled}
                    continue={this.onCheckoutContinue} />
                <Route path={this.props.match.path + '/contact-data'}
                    component={ContactData} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingr: state.ingredients
    }
}

export default connect(mapStateToProps)(Checkout);