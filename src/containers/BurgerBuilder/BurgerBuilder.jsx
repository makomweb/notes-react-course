import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import AxiosInstance from '../../AxiosInstance';
//import Axios from 'Axios';
import Spinner from '../../components/UI/Spinner/Spinner';
import ErrorModal from '../../hoc/ErrorModal/ErrorModal';

const INGREDIENT_PRICES = {
    lettuce: 0.5,
    cheese: 0.4,
    patty: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            lettuce: 0,
            bacon: 0,
            cheese: 0,
            patty: 0
        },
        totalPrice: 3.5,
        purchasable: false,
        orderClicked: false,
        loading: false
    }

    modalClosed = () => {
        this.setState({ orderClicked: false });
    }

    orderClickedHandler = () => {
        this.setState({ orderClicked: true });
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(ingredientKey => {
                return ingredients[ingredientKey];
            })
            .reduce((sum, element) => {
                return sum + element;
            }, 0);

        this.setState({ purchasable: sum > 0 })
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }

        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });

        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];

        // Continue removing if there is actually an ingredient of that type!
        if (oldCount > 0) {
            const updatedCount = oldCount - 1;
            const updatedIngredients = {
                ...this.state.ingredients
            }

            updatedIngredients[type] = updatedCount;
            const priceDeduction = INGREDIENT_PRICES[type];
            const oldPrice = this.state.totalPrice;
            const newPrice = oldPrice - priceDeduction;

            this.setState({
                ingredients: updatedIngredients,
                totalPrice: newPrice
            });

            this.updatePurchaseState(updatedIngredients);
        }
    }

    purchaseContinueHandler = () => {
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'DJ Emkay',
                address: {
                    town: 'Smalltown UK',
                    street: 'Bakerstreet 32',
                    country: 'UK'
                }
            },
            email: 'emaky@test.org',
            deliveryMethod: 'fastest'
        };

        this.setState({ loading: true });

        AxiosInstance.post('orders.json', order)
            .then(_ => {
                this.setState({ loading: false, orderClicked: false });
            })
            .catch(_ => {
                this.setState({ loading: false, orderClicked: false });
            });
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let ingredient in disabledInfo) {
            disabledInfo[ingredient] = disabledInfo[ingredient] <= 0; // true if there are ingredients of that type
        }

        let summary = <OrderSummary
            ingredients={this.state.ingredients}
            purchaseCancelled={this.modalClosed}
            purchaseContinued={this.purchaseContinueHandler}
            price={this.state.totalPrice}
        />;

        if (this.state.loading) {
            summary = <Spinner />;
        }

        // { lettuce: true, patty: true, bacon: false ... }
        return (
            <Aux>
                <Modal show={this.state.orderClicked} tapped={this.modalClosed}>
                    {summary}
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.orderClickedHandler}
                />
            </Aux>
        );
    }
};

export default ErrorModal(BurgerBuilder);