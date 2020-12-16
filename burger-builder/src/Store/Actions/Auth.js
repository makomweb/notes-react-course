import * as actionTypes from '../Actions/actionTypes';
import axios from 'axios';

const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    }
}

const authFailed = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('token-expires');
    localStorage.removeItem('user-id');

    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000) // seconds
    }
}

export const authenticate = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());

        const apiKey = 'AIzaSyDA02EJ4cRq6kXJeEAcX2EbJXi56-Fqt1A';
        const address = isSignup ?
            `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}` :
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;

        const payload = {
            email: email,
            password: password,
            returnSecureToken: true
        }

        axios.post(address, payload)
            .then(response => {
                const { idToken, localId, expiresIn } = response.data;
                const expiresAt = new Date(new Date().getTime() + expiresIn /* ms */ * 1000);
                localStorage.setItem('token', idToken);
                localStorage.setItem('token-expires', expiresAt);
                localStorage.setItem('user-id', localId);
                dispatch(authSuccess(idToken, localId));
                dispatch(checkAuthTimeout(expiresIn))
            })
            .catch(error => {
                console.log(error);
                dispatch(authFailed(error.response.data.error));
            });
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationTime = new Date(localStorage.getItem('token-expires'));
            if (expirationTime > new Date()) {
                const userId = localStorage.getItem('user-id');
                dispatch(authSuccess(token, userId));

                const interval = (expirationTime.getTime() - new Date().getTime()) / 1000;
                dispatch(checkAuthTimeout(interval));
            }
            else {
                dispatch(logout());
            }
        }
    }
}