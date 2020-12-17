import * as actionTypes from '../Actions/actionTypes';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
}

function fetchOrdersFailed(state) {
    return {
        ...state,
        loading: false
    };
}

function fetchOrdersSuccess(state, action) {
    return {
        ...state,
        orders: action.orders,
        loading: false
    };
}

function fetchOrdersStart(state) {
    return {
        ...state,
        loading: true
    };
}

function purchaseFailed(state) {
    return {
        ...state,
        loading: false
    };
}

function purchaseSuccess(action, state) {
    {
        const order = {
            ...action.orderData,
            id: action.orderId
        };
        return {
            ...state,
            loading: false,
            orders: state.orders.concat(order),
            purchased: true
        };
    }
}

function purchaseStart(state) {
    return {
        ...state,
        loading: true
    };
}

function purchaseInit(state) {
    return {
        ...state,
        purchased: false
    };
}

const reducer = (state = initialState, action) => {
    const { type } = action;
    switch (type) {
        case actionTypes.PURCHASE_INIT: return purchaseInit(state)
        case actionTypes.PURCHASE_BURGER_START: return purchaseStart(state)
        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseSuccess(action, state);
        case actionTypes.PURCHASE_BURGER_FAIL: return purchaseFailed(state)
        case actionTypes.FETCH_ORDERS_START: return fetchOrdersStart(state)
        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state, action)
        case actionTypes.FETCH_ORDERS_FAILED: return fetchOrdersFailed(state)
        default: return state;
    }
}

export default reducer;
