import * as actionTypes from '../actions/actions';

const initialState = {
    ingredients: {
        lettuce: 0,
        cheese: 0,
        patty: 0,
        bacon: 0
    },
    price: 4
}

const INGREDIENT_PRICES = {
    lettuce: 0.5,
    cheese: 0.4,
    patty: 1.3,
    bacon: 0.7
};


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            {
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
        case actionTypes.REMOVE_INGREDIENT:
            {
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
        default:
            return state;
    }
}

export default reducer;