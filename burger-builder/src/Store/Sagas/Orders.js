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