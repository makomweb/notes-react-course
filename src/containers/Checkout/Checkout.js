import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../ContactData/ContactData';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';

class Checkout extends Component {
    checkoutCancelled = () => {
        this.props.history.goBack();
    }

    checkoutContinued = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        const { ingredients } = this.props;

        if (ingredients) {
            const purchasedRedirect = this.props.purchased ? <Redirect to='/' /> : null;
            return (
                <div>
                    {purchasedRedirect}
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
        ingredients: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);