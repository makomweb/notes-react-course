import React, { useEffect, useState } from 'react';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Burger from '../../Components/Burger/Burger';
import Auxiliary from '../../HOC/Auxiliary/Auxiliary';
import Modal from '../../Components/UI/Modal/Modal.js';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import AxiosInstance from '../../AxiosInstance.js';
import Spinner from '../../Components/UI/Spinner/Spinner.js';
import ErrorModal from '../../HOC/ErrorModal/ErrorModal.js';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../Store/Actions';

const BurgerBuilder = props => {
    const [purchasing, setPurchasing] = useState(false);

    const ings = useSelector(state => {
        return state.burgerBuilder.ingredients
    });
    const price = useSelector(state => state.burgerBuilder.totalPrice);
    const error = useSelector(state => state.burgerBuilder.error);
    const isAuthenticated = useSelector(state => state.auth.token !== null);

    const dispatch = useDispatch();
    const onAdded = name => dispatch(actions.addIngredient(name));
    const onRemoved = name => dispatch(actions.removeIngredient(name));
    const onFetchPrices = () => dispatch(actions.fetchPrices());
    const initPurchase = () => dispatch(actions.purchaseInit());
    const setRedirectPath = path => dispatch(actions.setAuthRedirectPath(path));

    const canContinue = () => {
        const sum = Object.keys(ings)
            .map(key => {
                return ings[key];
            })
            .reduce((sum, element) => {
                return sum + element;
            }, 0);


        return sum > 0;
    }

    const onOrderClicked = () => {
        if (isAuthenticated) {
            setPurchasing(true);
        }
        else {
            setRedirectPath('/checkout');
            props.history.push('/auth');
        }
    }

    const onPurchaseCancelled = () => {
        setPurchasing(false);
    }

    const onPurchaseContinue = () => {
        initPurchase();
        props.history.push('/checkout');
    }

    useEffect(() => onFetchPrices(), [onFetchPrices]);

    // { lettuce: true, patty: true, bacon: false ... }
    const disabledInfo = {
        ...ings
    };

    for (let ingredient in disabledInfo) {
        disabledInfo[ingredient] = disabledInfo[ingredient] <= 0; // true if there are ingredients of that type
    }

    let orderSummary = null;
    let burger = error ? <p>Prices can't be loaded</p> : <Spinner />
    if (ings) {
        burger = (
            <Auxiliary>
                <Burger ingredients={ings} />
                <BuildControls
                    ingredientAdded={onAdded}
                    ingredientRemoved={onRemoved}
                    disabled={disabledInfo}
                    price={price}
                    purchasable={canContinue()}
                    ordered={onOrderClicked}
                    isAuthenticated={isAuthenticated} />
            </Auxiliary>);

        orderSummary = <OrderSummary
            ingredients={ings}
            cancelled={onPurchaseCancelled}
            continue={onPurchaseContinue}
            price={price} />;
    }

    return (
        <Auxiliary>
            <Modal show={purchasing} tapped={onPurchaseCancelled}>
                {orderSummary}
            </Modal>
            {burger}
        </Auxiliary>
    )
}

// const mapStateToProps = state => {
//     return {
//         ings: state.burgerBuilder.ingredients,
//         price: state.burgerBuilder.totalPrice,
//         error: state.burgerBuilder.error,
//         isAuthenticated: state.auth.token !== null
//     }
// }

// const mapActionsToDispatch = dispatch => {
//     return {
//         onAdded: (name) => dispatch(actions.addIngredient(name)),
//         onRemoved: (name) => dispatch(actions.removeIngredient(name)),
//         onFetchPrices: () => dispatch(actions.fetchPrices()),
//         initPurchase: () => dispatch(actions.purchaseInit()),
//         setRedirectPath: path => dispatch(actions.setAuthRedirectPath(path))
//     }
// }

export default ErrorModal(BurgerBuilder, AxiosInstance);