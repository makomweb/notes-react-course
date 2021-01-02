import { takeEvery } from 'redux-saga/effects';
import * as actionTypes from '../Actions/actionTypes';
import { logoutSaga, checkoutAuthTimeoutSaga } from './Auth'

export function* watchAll() {
    yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkoutAuthTimeoutSaga);
    yield takeEvery(actionTypes.AUTH_INIT_LOGOUT, logoutSaga);
}