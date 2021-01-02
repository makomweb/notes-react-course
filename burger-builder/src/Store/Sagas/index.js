import { takeEvery } from 'redux-saga/effects';
import * as actionTypes from '../Actions/actionTypes';
import { logoutSaga, checkoutAuthTimeoutSaga, authUserSaga, authCheckStateSaga } from './Auth'
import { fetchPricesSaga } from './BurgerBuilder';
import { purchaseBurgerSaga, fetchOrdersSaga } from './Orders';

export function* watchAll() {
    yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkoutAuthTimeoutSaga);
    yield takeEvery(actionTypes.AUTH_INIT_LOGOUT, logoutSaga);
    yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
    yield takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga);
}

export function* watchBurgerBuilder() {
    yield takeEvery(actionTypes.FETCH_PRICES, fetchPricesSaga);
}

export function* watchOrder() {
    yield takeEvery(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga);
    yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga);
}