import * as actionTypes from './actionTypes';
import AxiosInstance from '../../AxiosInstance';

const createPurchaseSuccessAction = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

const createPurchaseFailedAction = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAILED,
        error: error
    }
}

export const createPurchaseBurger = (order) => {
    return dispatch => {
        dispatch(createPurchaseBurgerStart());
        AxiosInstance.post('orders.json', order)
            .then(response => {
                dispatch(createPurchaseSuccessAction(response.data.name, order))
            })
            .catch(error => {
                dispatch(createPurchaseFailedAction(error))
            });
    }
}

export const createPurchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const createPurchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

const createFetchOrdersSuccessAction = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

const createFetchOrdersFailedAction = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAILED,
        error: error
    }
}

const createFetchOrdersStartAction = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const createFetchOrdersAction = () => {
    return dispatch => {
        dispatch(createFetchOrdersStartAction());
        AxiosInstance.get('orders.json')
            .then(response => {
                const orders = [];
                for (let key in response.data) {
                    orders.push({
                        id: key,
                        ...response.data[key]
                    });
                }
                dispatch(createFetchOrdersSuccessAction(orders));
            })
            .catch(error => {
                dispatch(createFetchOrdersFailedAction(error));
            });
    }
}

