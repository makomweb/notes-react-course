import * as actionTypes from './actionTypes';
import axios from 'axios';

// action creators for authentication

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

const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration-date');
    localStorage.removeItem('user-id');
    return {
        type: actionTypes.AUTH_LOGOUT,
        idToken: null,
        userId: null
    }
}

const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000) // to milliseconds
    }
}

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const data = {
            email: email,
            password: password,
            returnSecureToken: true
        }

        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBJCm83JVeTqMxl9MOA03PHA6ogt-Nkr-Y';
        if (!isSignup) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBJCm83JVeTqMxl9MOA03PHA6ogt-Nkr-Y';
        }

        axios.post(url, data)
            .then(response => {
                const { idToken, localId, expiresIn } = response.data;
                const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
                localStorage.setItem('token', idToken);
                localStorage.setItem('expiration-date', expirationDate);
                localStorage.setItem('user-id', localId);
                dispatch(authSuccess(idToken, localId));
                dispatch(checkAuthTimeout(expiresIn));
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error));
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
            const expirationDate = new Date(localStorage.getItem('expiration-date'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('user-id');
                dispatch(authSuccess(token, userId));

                const timeOut = (expirationDate.getTime() - new Date().getTime()) / 1000;
                dispatch(checkAuthTimeout(timeOut));
            }
        }
    }
}