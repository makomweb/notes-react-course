import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT: {
            return updateObject(state, { purchased: false });
        }
        case actionTypes.PURCHASE_BURGER_START: {
            return updateObject(state, { purchased: true });
        }
        case actionTypes.PURCHASE_BURGER_SUCCESS: {
            const order = {
                ...action.orderData,
                id: action.orderId
            }
            const properties = {
                orders: state.orders.concat(order),
                loading: false,
                purchased: true
            }
            return updateObject(state, properties);
        }
        case actionTypes.PURCHASE_BURGER_FAILED: {
            return updateObject(state, { loading: false });
        }
        case actionTypes.FETCH_ORDERS_START: {
            return updateObject(state, { loading: true });
        }
        case actionTypes.FETCH_ORDERS_SUCCESS: {
            const properties = {
                orders: action.orders,
                loading: false
            }
            return updateObject(state, properties);
        }
        case actionTypes.FETCH_ORDERS_FAILED: {
            return updateObject(state, { loading: false });
        }
        default: return state;
    }
}

export default reducer;