import * as actions from '../Actions/actions';

const initialState = {
    ingredients: {
        lettuce: 0,
        bacon: 0,
        cheese: 0,
        beef: 0
    },
    totalPrice: 4,
    prices: null
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
            console.log('[reducer.js]', action.prices);
            return {
                ...state,
                prices: action.prices
            };
        default:
            return state;
    }
}

export default reducer;