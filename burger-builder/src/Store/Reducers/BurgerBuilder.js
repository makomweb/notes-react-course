import * as actions from '../Actions/actionTypes';
import { updateObject } from '../Utility';

const initialState = {
    ingredients: {
        lettuce: 0,
        bacon: 0,
        cheese: 0,
        beef: 0
    },
    totalPrice: 4,
    prices: null,
    error: false
};

const reducer = (state = initialState, action) => {

    const { type, ingredientName } = action;

    switch (type) {
        case actions.ADD_INGREDIENT: {
            const updatedIngredient = {
                [ingredientName]: state.ingredients[ingredientName] + 1
            }
            const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
            const updatedState = {
                ingredients: updatedIngredients,
                totalPrice: state.totalPrice + state.prices[ingredientName]
            }
            return updateObject(state, updatedState);
        }

        case actions.REMOVE_INGREDIENT: {
            const updatedIngredient = {
                [ingredientName]: state.ingredients[ingredientName] - 1
            }
            const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
            const updatedState = {
                ingredients: updatedIngredients,
                totalPrice: state.totalPrice - state.prices[ingredientName]
            }
            return updateObject(state, updatedState);
        }

        case actions.UPDATE_PRICES:
            return updateObject(state, {
                prices: action.prices,
                error: false
            });

        case actions.FETCH_PRICES_FAILED:
            return updateObject(state, {
                error: true
            });

        case actions.PURCHASE_BURGER_SUCCESS: {
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

        default:
            return state;
    }
}

export default reducer;