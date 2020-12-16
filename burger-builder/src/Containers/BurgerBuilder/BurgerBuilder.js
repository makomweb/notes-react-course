import React, { Component } from 'react';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Burger from '../../Components/Burger/Burger';
import Auxiliary from '../../HOC/Auxiliary/Auxiliary';
import Modal from '../../Components/UI/Modal/Modal.js';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import AxiosInstance from '../../AxiosInstance.js';
import Spinner from '../../Components/UI/Spinner/Spinner.js';
import ErrorModal from '../../HOC/ErrorModal/ErrorModal.js';
import { connect } from 'react-redux';
import * as actions from '../../Store/Actions';

class BurgerBuilder extends Component {
    state = {
        purchasing: false
    }

    canContinue() {
        const { ings } = this.props;
        const sum = Object.keys(ings)
            .map(key => {
                return ings[key];
            })
            .reduce((sum, element) => {
                return sum + element;
            }, 0);


        return sum > 0;
    }

    handleOrderClicked = () => {
        if (this.props.isAuthenticated) {
            this.setState({ purchasing: true });
        }
        else {
            this.props.history.push('/auth');
        }
    }

    handlePurchaseCancelled = () => {
        this.setState({ purchasing: false });
    }

    handlePurchaseContinue = () => {
        this.props.initPurchase();
        this.props.history.push('/checkout');
    }

    componentDidMount = () => {
        this.props.onFetchPrices();
    }

    render() {
        // { lettuce: true, patty: true, bacon: false ... }
        const disabledInfo = {
            ...this.props.ings
        };

        for (let ingredient in disabledInfo) {
            disabledInfo[ingredient] = disabledInfo[ingredient] <= 0; // true if there are ingredients of that type
        }

        let orderSummary = null;
        let burger = this.props.error ? <p>Prices can't be loaded</p> : <Spinner />
        if (this.props.ings) {
            burger = (
                <Auxiliary>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onAdded}
                        ingredientRemoved={this.props.onRemoved}
                        disabled={disabledInfo}
                        price={this.props.price}
                        purchasable={this.canContinue()}
                        ordered={this.handleOrderClicked}
                        isAuthenticated={this.props.isAuthenticated} />
                </Auxiliary>);

            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                cancelled={this.handlePurchaseCancelled}
                continue={this.handlePurchaseContinue}
                price={this.props.price} />;
        }

        return (
            <Auxiliary>
                <Modal show={this.state.purchasing} tapped={this.handlePurchaseCancelled}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxiliary>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
}

const mapActionsToDispatch = dispatch => {
    return {
        onAdded: (name) => dispatch(actions.addIngredient(name)),
        onRemoved: (name) => dispatch(actions.removeIngredient(name)),
        onFetchPrices: () => dispatch(actions.fetchPrices()),
        initPurchase: () => dispatch(actions.purchaseInit())
    }
}

export default connect(mapStateToProps, mapActionsToDispatch)(ErrorModal(BurgerBuilder, AxiosInstance));