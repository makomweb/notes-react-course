import { takeEvery } from 'redux-saga/effects';
import * as actionTypes from '../Actions/actionTypes';
import { logoutSaga } from './Auth'

function* watchAll() {
    yield takeEvery(actionTypes.AUTH_INIT_LOGOUT, logoutSaga);
}