import * as actionTypes from '../Actions/actions';

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
        type: actionTypes.UPDATE_PRICES,
        prices: prices
    };
}