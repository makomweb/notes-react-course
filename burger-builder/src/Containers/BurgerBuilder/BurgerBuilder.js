import React, { Component } from 'react';
import BuildControls from '../../Components/Layout/Burger/BuildControls/BuildControls';
import Burger from '../../Components/Layout/Burger/Burger';
import Auxiliary from '../../HOC/Auxiliary';

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            lettuce: 1,
            bacon: 1,
            cheese: 2,
            beef: 2
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