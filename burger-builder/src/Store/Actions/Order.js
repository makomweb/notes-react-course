import * as actionTypes from './actionTypes';
import AxiosInstance from '../../AxiosInstance';

const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

const purchaseBurgerFail = (error) => {
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
                console.log('[Order.js] purchaseBurger', data);
                dispatch(purchaseBurgerSuccess(data.name, orderData));
            })
            .catch(error => {
                console.log('[Order.js] purchaseBurger', error);
                dispatch(purchaseBurgerFail(error));
            });
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}