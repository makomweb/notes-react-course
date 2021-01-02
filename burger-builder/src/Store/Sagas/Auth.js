import { put } from 'redux-saga/effects';
import * as actionTypes from '../Actions/actionTypes';
import * as actions from '../Actions/index';

export function* logoutSaga(action) {
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('token-expires');
    yield localStorage.removeItem('user-id');
    yield put(actions.logoutSuccess());
}