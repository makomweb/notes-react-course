import { delay, put } from 'redux-saga/effects';
import axios from 'axios';
import * as actions from '../Actions/index';

export function* logoutSaga(action) {
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('token-expires');
    yield localStorage.removeItem('user-id');
    yield put(actions.logoutSuccess());
}

export function* checkoutAuthTimeoutSaga(action) {
    yield delay(action.expirationTime * 1000); // s
    yield put(actions.logout());
}

export function* authUserSaga(action) {
    yield put(actions.authStart());

    const apiKey = '<YOUR-GOOGLE-APIS-API-KEY>';
    const address = action.isSignup ?
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}` :
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;

    const payload = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    }

    try {
        const response = yield axios.post(address, payload);
        const { idToken, localId, expiresIn } = response.data;
        const expiresAt = new Date(new Date().getTime() + expiresIn /* ms */ * 1000);
        localStorage.setItem('token', idToken);
        localStorage.setItem('token-expires', expiresAt);
        localStorage.setItem('user-id', localId);

        yield put(actions.authSuccess(idToken, localId));
        yield put(actions.checkAuthTimeout(expiresIn));
    }
    catch (error) {
        yield put(actions.authFailed(error.response.data.error));
    }
}

export function* authCheckStateSaga(action) {
    const token = localStorage.getItem('token');
    if (!token) {
        yield put(actions.logout());
    } else {
        const expirationTime = new Date(localStorage.getItem('token-expires'));
        if (expirationTime > new Date()) {
            const userId = localStorage.getItem('user-id');
            yield put(actions.authSuccess(token, userId));

            const interval = (expirationTime.getTime() - new Date().getTime()) / 1000;
            yield put(actions.checkAuthTimeout(interval));
        }
        else {
            yield put(actions.logout());
        }
    }
}