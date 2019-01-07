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
import * as actionTypes from '../../store/actions';

const INGREDIENT_PRICES = {
    lettuce: 0.5,
    cheese: 0.4,
    patty: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {
    state = {
        totalPrice: 3.5,
        purchasable: false,
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
        const queryParams = []
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push("price=" + this.state.totalPrice);

        const queryString = queryParams.join('&');

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

    render() {
        const { ingredients } = this.props;

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
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        ordered={this.onOrderClicked}
                    />
                </Aux>
            );

            summary = <OrderSummary
                ingredients={ingredients}
                purchaseCancelled={this.onModalTapped}
                purchaseContinued={this.purchaseContinueHandler}
                price={this.state.totalPrice}
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
        totalPrice: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAdded: (name) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: name }),
        onRemoved: (name) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: name })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorModal(BurgerBuilder, AxiosInstance));