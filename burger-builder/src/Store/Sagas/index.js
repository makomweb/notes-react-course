import { takeEvery } from 'redux-saga/effects';
import * as actionTypes from '../Actions/actionTypes';
import { logoutSaga } from './Auth'

export function* watchAll() {
    yield takeEvery(actionTypes.AUTH_INIT_LOGOUT, logoutSaga);
}