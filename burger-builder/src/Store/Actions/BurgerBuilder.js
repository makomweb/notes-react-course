import * as actionTypes from '../Actions/actionTypes';

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    };
}

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    };
}

export const updatePrices = (prices) => {
    return {
        type: actionTypes.FETCH_PRICES_SUCCESS,
        prices: prices
    };
}

export const fetchPricesFailed = () => {
    return {
        type: actionTypes.FETCH_PRICES_FAILED
    };
}

export const fetchPrices = () => {
    return {
        type: actionTypes.FETCH_PRICES
    }
}