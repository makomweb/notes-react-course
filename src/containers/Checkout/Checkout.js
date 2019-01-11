import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../ContactData/ContactData';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/actionTypes';

class Checkout extends Component {
    checkoutCancelled = () => {
        this.props.history.goBack();
    }

    checkoutContinued = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    componentDidMount() {
        this.props.onInitPurchase();
    }

    render() {
        const { ingredients } = this.props;

        if (ingredients) {
            return (
                <div>
                    <CheckoutSummary
                        ingredients={ingredients}
                        checkoutCancelled={this.checkoutCancelled}
                        checkoutContinued={this.checkoutContinued} />
                    <Route
                        path='/checkout/contact-data'
                        component={ContactData} />
                </div>
            );
        }
        else {
            return <Redirect to='/' />;
        }

    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitPurchase: () => dispatch(actionTypes.PURCHASE_INIT)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);