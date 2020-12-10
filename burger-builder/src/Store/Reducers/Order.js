import * as actionTypes from '../Actions/actionTypes';

const initialState = {
    orders: [],
    loading: false
}

const reducer = (state = initialState, action) => {
    const { type } = action;
    switch (type) {
        case actionTypes.PURCHASE_BURGER_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.PURCHASE_BURGER_SUCCESS: {
            const order = {
                ...action.orderData,
                id: action.orderId
            }
            return {
                ...state,
                loading: false,
                orders: state.orders.concat(order)
            }
        }

        case actionTypes.PURCHASE_BURGER_FAIL:
            return {
                ...state,
                loading: false
            }

        default: return state;
    }
}

export default reducer;