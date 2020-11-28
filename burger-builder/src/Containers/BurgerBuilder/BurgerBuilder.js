import React, { Component } from 'react';
import BuildControls from '../../Components/Layout/Burger/BuildControls/BuildControls';
import Burger from '../../Components/Layout/Burger/Burger';
import Auxiliary from '../../HOC/Auxiliary';

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
        totalPrice: 4 // 4 is the base
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
    }

    removeIngredientHandler = (type) => {

    }

    render() {
        return (
            <Auxiliary>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler} />
            </Auxiliary>
        )
    }
}

export default BurgerBuilder;