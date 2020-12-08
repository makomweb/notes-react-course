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
    switch (action.type) {
        case actions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients
                }
            };
        case actions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients
                }
            };
        default:
            return state;
    }
}

export default reducer;