import * as actionTypes from './actionTypes';
import AxiosInstance from '../../AxiosInstance';

export const createPurchaseSuccessAction = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const createPurchaseFailedAction = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAILED,
        error: error
    }
}

export const createPurchaseStartAction = (order) => {
    return dispatch => {
        AxiosInstance.post('orders.json', order)
            .then(response => {
                console.log('[createPurchaseStartAction]', response.data);
                dispatch(createPurchaseSuccessAction(response.data, order))
            })
            .catch(error => {
                dispatch(createPurchaseFailedAction(error))
            });
    }
}