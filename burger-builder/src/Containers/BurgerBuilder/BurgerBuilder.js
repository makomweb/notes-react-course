import React, { Component } from 'react';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Burger from '../../Components/Burger/Burger';
import Auxiliary from '../../HOC/Auxiliary';
import Modal from '../../Components/UI/Modal/Modal.js';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    lettuce: 0.5,
    cheese: 0.4,
    beef: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            lettuce: 0,
            bacon: 0,
            cheese: 0,
            beef: 0
        },
        totalPrice: 4, // 4 is the base
        purchasable: false,
        purchasing: false
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;

        const priceAddition = INGREDIENT_PRICES[type];
        const updatedPrice = this.state.totalPrice + priceAddition;
        this.setState({ totalPrice: updatedPrice, ingredients: updatedIngredients });

        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }

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

    handleOrderClicked = () => {
        this.setState({ purchasing: true });
    }

    render() {
        // { lettuce: true, patty: true, bacon: false ... }
        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let ingredient in disabledInfo) {
            disabledInfo[ingredient] = disabledInfo[ingredient] <= 0; // true if there are ingredients of that type
        }

        return (
            <Auxiliary>
                <Modal show={this.state.purchasing} >
                    <OrderSummary ingredients={this.state.ingredients} />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.handleOrderClicked} />
            </Auxiliary>
        )
    }
}

export default BurgerBuilder;