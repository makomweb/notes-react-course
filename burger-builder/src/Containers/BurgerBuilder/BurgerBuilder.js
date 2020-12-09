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
        purchasing: false,
        loading: false,
        error: false
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
        this.setState({ purchasing: true });
    }

    handlePurchaseCancelled = () => {
        this.setState({ purchasing: false });
    }

    handlePurchaseContinue = () => {
        this.props.history.push('/checkout');
    }

    componentDidMount = () => {
        AxiosInstance.get('/prices.json')
            .then(response => {
                this.props.onPricesFetched(response.data);
                console.log('[BurgerBuilder.js]: Fetched prices', response.data);
            })
            .catch(error => {
                this.setState({ error: true });
                console.log('[BurgerBuilder.js]: Error while fetching prices', error);
            });
    }

    render() {
        // { lettuce: true, patty: true, bacon: false ... }
        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let ingredient in disabledInfo) {
            disabledInfo[ingredient] = disabledInfo[ingredient] <= 0; // true if there are ingredients of that type
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>Prices can't be loaded</p> : <Spinner />
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
                        ordered={this.handleOrderClicked} />
                </Auxiliary>);

            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                cancelled={this.handlePurchaseCancelled}
                continue={this.handlePurchaseContinue}
                price={this.props.price} />;
        }

        if (this.state.loading) {
            orderSummary = <Spinner />
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
        ings: state.ingredients,
        price: state.totalPrice
    }
}

const mapActionsToDispatch = dispatch => {
    return {
        onAdded: (name) => dispatch(actions.addIngredient(name)),
        onRemoved: (name) => dispatch(actions.removeIngredient(name)),
        onPricesFetched: (prices) => dispatch(actions.updatePrices(prices)),
    }
}

export default connect(mapStateToProps, mapActionsToDispatch)(ErrorModal(BurgerBuilder, AxiosInstance));