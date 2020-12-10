import * as actions from '../Actions/actionTypes';

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
        case actions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [ingredientName]: state.ingredients[ingredientName] + 1
                },
                totalPrice: state.totalPrice + state.prices[ingredientName]
            };
        case actions.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [ingredientName]: state.ingredients[ingredientName] - 1
                },
                totalPrice: state.totalPrice - state.prices[ingredientName]
            };
        case actions.UPDATE_PRICES:
            return {
                ...state,
                prices: action.prices,
                error: false
            };
        case actions.FETCH_PRICES_FAILED:
            return {
                ...state,
                error: true
            };

        case actions.PURCHASE_BURGER_SUCCESS: {
            return {
                ingredients: {
                    lettuce: 0,
                    bacon: 0,
                    cheese: 0,
                    beef: 0
                },
                totalPrice: 4
            }
        }
        default:
            return state;
    }
}

export default reducer;