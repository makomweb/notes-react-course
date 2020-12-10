import * as actionTypes from './actionTypes';
import AxiosInstance from '../../AxiosInstance';

export const purchasBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchasBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}

export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        AxiosInstance.post('/orders.json', orderData)
            .then(response => {
                const { data } = response;
                console.log(data);
                dispatch(purchasBurgerSuccess(data, orderData));
            })
            .catch(error => {
                dispatch(purchasBurgerFail(error));
            });
    }
}

const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}