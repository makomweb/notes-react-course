import * as actionTypes from '../actions/actionTypes';

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
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [ingredientName]: state.ingredients[ingredientName] + 1
                },
                price: state.price + INGREDIENT_PRICES[ingredientName]
            };
        }
        case actionTypes.REMOVE_INGREDIENT: {
            const { ingredientName } = action;
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                price: state.price - INGREDIENT_PRICES[ingredientName]
            };
        }
        case actionTypes.SET_INGREDIENTS: {
            return {
                ...state,
                ingredients: {
                    lettuce: action.ingredients.lettuce,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    patty: action.ingredients.patty
                },
                price: initialPrice,
                error: false
            }
        }
        case actionTypes.FETCH_INGREDIENTS_FAILED: {
            return {
                ...state,
                error: true
            }
        }
        default:
            return state;
    }
}

export default reducer;