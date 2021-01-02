import { takeEvery, all } from 'redux-saga/effects';
import * as actionTypes from '../Actions/actionTypes';
import { logoutSaga, checkoutAuthTimeoutSaga, authUserSaga, authCheckStateSaga } from './Auth';
import { fetchPricesSaga } from './FetchPrices';
import { fetchOrdersSaga } from './FetchOrders';
import { purchaseBurgerSaga } from './PurchaseBurger';

export function* watchAll() {
    yield all([
        takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkoutAuthTimeoutSaga),
        takeEvery(actionTypes.AUTH_INIT_LOGOUT, logoutSaga),
        takeEvery(actionTypes.AUTH_USER, authUserSaga),
        takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga)
    ]);
}

export function* watchBurgerBuilder() {
    yield takeEvery(actionTypes.FETCH_PRICES, fetchPricesSaga);
}

export function* watchOrder() {
    yield takeEvery(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga);
    yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga);
}