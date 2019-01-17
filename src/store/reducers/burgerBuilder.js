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


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: {
            const { ingredientName } = action;
            const updatedIngredient = { [ingredientName]: state.ingredients[ingredientName] + 1 }
            const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
            const updatedState = {
                ingredients: updatedIngredients,
                price: state.price + INGREDIENT_PRICES[ingredientName]
            }
            return updateObject(state, updatedState);
        }
        case actionTypes.REMOVE_INGREDIENT: {
            const { ingredientName } = action;
            const updatedIngredient = { [ingredientName]: state.ingredients[ingredientName] - 1 }
            const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
            const updatedState = {
                ingredients: updatedIngredients,
                price: state.price + INGREDIENT_PRICES[ingredientName]
            }
            return updateObject(state, updatedState);
        }
        case actionTypes.SET_INGREDIENTS: {
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
        case actionTypes.FETCH_INGREDIENTS_FAILED: {
            return updateObject(state, { error: true });
        }
        default:
            return state;
    }
}

export default reducer;