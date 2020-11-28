import React, { Component } from 'react';
import Auxiliary from '../../HOC/Auxiliary';

class BurgerBuilder extends Component {

    render() {
        return (
            <Auxiliary>
                <div>Burger (graphical representation)</div>
                <div>Build controls</div>
            </Auxiliary>
        )
    }
}

export default BurgerBuilder;