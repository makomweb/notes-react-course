import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialPrice = 4.0;

const initialState = {
    ingredients: null,
    price: initialPrice,
    error: false
}

const INGREDIENT_PRICES = {
    lettuce: 0.5,
    cheese: 0.4,
    patty: 1.3,
    bacon: 0.7
};

const addIngredient = (state, action) => {
    const { ingredientName } = action;
    const updatedIngredient = { [ingredientName]: state.ingredients[ingredientName] + 1 }
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        price: state.price + INGREDIENT_PRICES[ingredientName]
    }
    return updateObject(state, updatedState);
}

const removeIngredient = (state, action) => {
    const { ingredientName } = action;
    const updatedIngredient = { [ingredientName]: state.ingredients[ingredientName] - 1 }
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    const updatedState = {
        ingredients: updatedIngredients,
        price: state.price + INGREDIENT_PRICES[ingredientName]
    }
    return updateObject(state, updatedState);
}

const setIngredients = (state, action) => {
    const updatedState = {
        ingredients: {
            lettuce: action.ingredients.lettuce,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            patty: action.ingredients.patty
        },
        price: initialPrice,
        error: false
    }
    return updateObject(state, updatedState);
}

const indicateFetchingIngredientsFailed = (state, action) => {
    return updateObject(state, { error: true });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAILED: return indicateFetchingIngredientsFailed(state, action);
        default: return state;
    }
}

export default reducer;