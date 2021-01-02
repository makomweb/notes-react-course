import { put } from 'redux-saga/effects';
import AxiosInstance from '../../AxiosInstance';
import * as actions from '../Actions/index';

export function* purchaseBurgerSaga(action) {

    yield put(actions.purchaseBurgerStart());
    const { token, orderData } = action;
    try {
        const response = yield AxiosInstance.post(`/orders.json?auth=${token}`, orderData)
        const { data } = response;
        yield put(actions.purchaseBurgerSuccess(data.name, orderData));
    }
    catch (error) {
        yield put(actions.purchaseBurgerFail(error));
    }
}

export function* fetchOrdersSaga(action) {

    yield put(actions.fetchOrdersStart());
    const { token, userId } = action;
    const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
    try {
        const response = yield AxiosInstance.get('/orders.json' + queryParams);
        const fetchedOrders = [];
        for (let key in response.data) {
            fetchedOrders.push({
                ...response.data[key],
                id: key
            });
        }

        yield put(actions.fetchOrdersSuccess(fetchedOrders));
    }
    catch (error) {
        yield put(actions.fetchOrdersFailed(error));
    }
}