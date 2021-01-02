import * as actions from '../Actions/actionTypes';
import { updateObject } from '../../Shared/Utility';

const initialState = {
    ingredients: {
        lettuce: 0,
        bacon: 0,
        cheese: 0,
        beef: 0
    },
    totalPrice: 4,
    prices: null,
    error: false,
    building: false
};

const addIngredient = (state, action) => {
    const { ingredientName } = action;
    const updatedIngredient = {
        [ingredientName]: state.ingredients[ingredientName] + 1
    }
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + state.prices[ingredientName],
        building: true
    }
    return updateObject(state, updatedState);
}

const removeIngredient = (state, action) => {
    const { ingredientName } = action;
    const updatedIngredient = {
        [ingredientName]: state.ingredients[ingredientName] - 1
    }
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice - state.prices[ingredientName],
        building: true
    }
    return updateObject(state, updatedState);
}

const fetchPricesSuccess = (state, action) => {
    return updateObject(state, {
        prices: action.prices,
        error: false,
        building: false
    });
}

const storeBurgerPurchaseSuccess = (state) => {
    return updateObject(state, {
        ingredients: {
            lettuce: 0,
            bacon: 0,
            cheese: 0,
            beef: 0
        },
        totalPrice: 4
    });
}

const fetchPricesFailed = (state) => {
    return updateObject(state, {
        error: true
    });
}

const reducer = (state = initialState, action) => {
    const { type } = action;
    switch (type) {
        case actions.ADD_INGREDIENT: return addIngredient(state, action);
        case actions.REMOVE_INGREDIENT: return removeIngredient(state, action);
        case actions.FETCH_PRICES_SUCCESS: return fetchPricesSuccess(state, action);
        case actions.FETCH_PRICES_FAILED: return fetchPricesFailed(state);
        case actions.PURCHASE_BURGER_SUCCESS: return storeBurgerPurchaseSuccess(state);
        default: return state;
    }
}

export default reducer;