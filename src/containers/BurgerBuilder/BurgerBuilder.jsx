import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import AxiosInstance from '../../AxiosInstance';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorModal from '../../hoc/WithErrorModal/WithErrorModal';
import { connect } from 'react-redux';
import * as burgerBuilderActionCreators from '../../store/actions/index'; // index can be ommitted

class BurgerBuilder extends Component {
    state = {
        error: false
    }

    componentDidMount() {
        console.log("[BurgerBuilder.js] componentDidMount()");
        console.log(this.props);
        // AxiosInstance.get('ingredients.json')
        //     .then(response => {
        //         this.setState({ ingredients: response.data });
        //     })
        //     .catch(error => console.log(error));
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
        this.props.history.push('/checkout');
    }

    render() {
        const { ingredients, price } = this.props;

        const disabledInfo = {
            ...ingredients
        };

        for (let ingredient in disabledInfo) {
            disabledInfo[ingredient] = disabledInfo[ingredient] <= 0; // true if there are ingredients of that type
        }

        let summary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

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
        ingredients: state.ingredients,
        price: state.price
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAdded: (name) => dispatch(burgerBuilderActionCreators.createAddIngredientAction(name)),
        onRemoved: (name) => dispatch(burgerBuilderActionCreators.createRemoveIngredientAction(name))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorModal(BurgerBuilder, AxiosInstance));