import { put } from 'redux-saga/effects';
import * as actionTypes from '../Actions/actionTypes';

function* logout(action) {
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('token-expires');
    yield localStorage.removeItem('user-id');
    yield put({
        type: actionTypes.AUTH_LOGOUT
    });
}