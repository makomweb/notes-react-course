import * as actions from './actions';

const initialState = {
    ingredients: {
        lettuce: 0,
        bacon: 0,
        cheese: 0,
        beef: 0
    },
    totalPrice: 4
}

const reducer = (state = initialState, action) => {

    const { type, ingredientName } = action;

    switch (type) {
        case actions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [ingredientName]: state.ingredients[ingredientName] + 1
                }
            };
        case actions.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [ingredientName]: state.ingredients[ingredientName] - 1
                }
            };
        default:
            return state;
    }
}

export default reducer;