import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorModal from '../../hoc/WithErrorModal/WithErrorModal';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index'; // index can be ommitted
import AxiosInstance from '../../AxiosInstance';

class BurgerBuilder extends Component {
    state = {
        orderClicked: false
    }

    componentDidMount() {
        this.props.onInitIngredients();
    }

    onModalTapped = () => {
        this.setState({ orderClicked: false });
    }

    onOrderClicked = () => {
        this.setState({ orderClicked: true });
    }

    isPurchasable(ingredients) {
        const sum = Object.keys(ingredients)
            .map(ingredientKey => {
                return ingredients[ingredientKey];
            })
            .reduce((sum, element) => {
                return sum + element;
            }, 0);

        return sum > 0;
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    render() {
        const { ingredients, price, error } = this.props;
        //console.log('[BurgerBuilder.jsx]', error);

        const disabledInfo = {
            ...ingredients
        };

        for (let ingredient in disabledInfo) {
            disabledInfo[ingredient] = disabledInfo[ingredient] <= 0; // true if there are ingredients of that type
        }

        let summary = null;
        let burger = error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

        if (ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={ingredients} />
                    <BuildControls
                        ingredientAdded={this.props.onAdded}
                        ingredientRemoved={this.props.onRemoved}
                        disabled={disabledInfo}
                        price={price}
                        purchasable={this.isPurchasable(ingredients)}
                        ordered={this.onOrderClicked}
                    />
                </Aux>
            );

            summary = <OrderSummary
                ingredients={ingredients}
                purchaseCancelled={this.onModalTapped}
                purchaseContinued={this.purchaseContinueHandler}
                price={price}
            />;
        }

        // { lettuce: true, patty: true, bacon: false ... }
        return (
            <Aux>
                <Modal show={this.state.orderClicked} tapped={this.onModalTapped}>
                    {summary}
                </Modal>
                {burger}
            </Aux>
        );
    }
};

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.price,
        error: state.order.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAdded: (name) => dispatch(actionCreators.createAddIngredientAction(name)),
        onRemoved: (name) => dispatch(actionCreators.createRemoveIngredientAction(name)),
        onInitIngredients: () => dispatch(actionCreators.createInitIngredientsAction()),
        onInitPurchase: () => dispatch(actionCreators.createPurchaseInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorModal(BurgerBuilder, AxiosInstance));