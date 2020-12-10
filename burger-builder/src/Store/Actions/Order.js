import * as actionTypes from './actionTypes';

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

export const purchaseBurgerStart = (orderData) => {
    return dispatch => {
        AxiosInstance.post('/orders.json', order)
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