import * as actionTypes from '../actions/actionTypes'

const initialState = {
    orders: [],
    loading: false
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_BURGER_START: {
            return {
                ...state,
                loading: true
            }
        }
        case actionTypes.PURCHASE_BURGER_SUCCESS: {
            const order = {
                ...action.orderData,
                id: action.orderId
            }
            return {
                ...state,
                orders: state.orders.concat(order),
                loading: false
            }
        }
        case actionTypes.PURCHASE_BURGER_FAILED: {
            return {
                ...state,
                loading: false
            }
        }
        default: return state;
    }
}

export default reducer;