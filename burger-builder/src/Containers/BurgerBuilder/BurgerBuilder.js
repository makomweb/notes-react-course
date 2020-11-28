import React, { Component } from 'react';
import Burger from '../../Components/Layout/Burger/Burger';
import Auxiliary from '../../HOC/Auxiliary';

class BurgerBuilder extends Component {

    render() {
        return (
            <Auxiliary>
                <Burger />
                <div>Build controls</div>
            </Auxiliary>
        )
    }
}

export default BurgerBuilder;