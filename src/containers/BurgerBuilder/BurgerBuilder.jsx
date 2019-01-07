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

class BurgerBuilder extends Component {
    state = {
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

    purchaseContinueHandler = () => {
        const queryParams = []
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push("price=" + this.state.price);

        const queryString = queryParams.join('&');

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
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
                        purchasable={this.state.purchasable}
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
        onAdded: (name) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: name }),
        onRemoved: (name) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: name })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorModal(BurgerBuilder, AxiosInstance));