import { put } from 'redux-saga/effects';
import AxiosInstance from '../../AxiosInstance';
import * as actions from '../Actions/index';

export function* fetchPricesSaga(action) {
    try {
        const response = yield AxiosInstance.get('/prices.json');
        yield put(actions.fetchOrdersSuccess(response.data));
    }
    catch (error) {
        yield put(actions.fetchPricesFailed());
    }
}