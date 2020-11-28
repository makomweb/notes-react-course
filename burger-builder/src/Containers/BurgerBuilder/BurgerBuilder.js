import React, { Component } from 'react';
import BuildControls from '../../Components/Layout/Burger/BuildControls/BuildControls';
import Burger from '../../Components/Layout/Burger/Burger';
import Auxiliary from '../../HOC/Auxiliary';

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            lettuce: 0,
            bacon: 0,
            cheese: 0,
            beef: 0
        }
    }

    render() {
        return (
            <Auxiliary>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls />
            </Auxiliary>
        )
    }
}

export default BurgerBuilder;