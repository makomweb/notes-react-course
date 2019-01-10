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
                console.log('[createPurchaseBurger]', response.data);
                dispatch(createPurchaseSuccessAction(response.data, order))
            })
            .catch(error => {
                dispatch(createPurchaseFailedAction(error))
            });
    }
}