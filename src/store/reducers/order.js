import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
}

const initializePurchase = (state, action) => {
    return updateObject(state, { purchased: false });
}

const startPurchasing = (state, action) => {
    return updateObject(state, { purchased: true });
}

const handlePurchaseSuccess = (state, action) => {
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

const handlePurchaseFailed = (state, action) => {
    return updateObject(state, { loading: false });
}

const startFetchingOrders = (state, action) => {
    return updateObject(state, { loading: true });
}

const handleFetchOrdersSuccess = (state, action) => {
    const properties = {
        orders: action.orders,
        loading: false
    }
    return updateObject(state, properties);
}

const handleFetchOrdersFailed = (state, action) => {
    return updateObject(state, { loading: false });
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT: return initializePurchase(state, action);
        case actionTypes.PURCHASE_BURGER_START: return startPurchasing(state, action);
        case actionTypes.PURCHASE_BURGER_SUCCESS: return handlePurchaseSuccess(state, action);
        case actionTypes.PURCHASE_BURGER_FAILED: return handlePurchaseFailed(state, action);
        case actionTypes.FETCH_ORDERS_START: return startFetchingOrders(state, action);
        case actionTypes.FETCH_ORDERS_SUCCESS: return handleFetchOrdersSuccess(state, action);
        case actionTypes.FETCH_ORDERS_FAILED: return handleFetchOrdersFailed(state, action);
        default: return state;
    }
}

export default reducer;