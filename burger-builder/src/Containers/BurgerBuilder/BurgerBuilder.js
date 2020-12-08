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
import * as actions from '../../Store/actions';

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
        // this.setState({ loading: true });

        // const order = {
        //     ingredient: this.state.ingredients,
        //     price: this.props.price.toFixed(2),
        //     customer: {
        //         name: 'Mary',
        //         address: {
        //             street: 'Teststreet 1',
        //             zipCode: '43215',
        //             country: 'Germany'
        //         },
        //         email: 'test@test.com'
        //     },
        //     deliveryMethod: 'fast'
        // }

        // AxiosInstance.post('/orders.json', order)
        //     .then(response => {
        //         this.setState({ loading: false, purchasing: false });
        //     })
        //     .catch(error => {
        //         this.setState({ loading: false, purchasing: false });
        //     });

        const queryParams = [];
        for (let i in this.props.ings) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ings[i]));
        }

        queryParams.push('price=' + this.props.price);

        const queryString = queryParams.join('&');

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

    componentDidMount = () => {
        console.log('[BurgerBuilder.js]', this.props);
        //     AxiosInstance.get('/ingredients.json')
        //         .then(response => {
        //             this.setState({ ingredients: response.data });
        //             console.log('[BurgerBuilder.js]: Fetched ingredients', response.data);
        //         })
        //         .catch(error => {
        //             this.setState({ error: true });
        //             console.log('[BurgerBuilder.js]: Error while fetching ingredients', error);
        //         });

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
        onAdded: (ingName) => dispatch({ type: actions.ADD_INGREDIENT, ingredientName: ingName }),
        onRemoved: (ingName) => dispatch({ type: actions.REMOVE_INGREDIENT, ingredientName: ingName }),
        onPricesFetched: (prices) => dispatch({ type: actions.UPDATE_PRICES, prices: prices }),
    }
}

export default connect(mapStateToProps, mapActionsToDispatch)(ErrorModal(BurgerBuilder, AxiosInstance));