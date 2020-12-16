import * as actionTypes from '../Actions/actionTypes';
import axios from 'axios';

const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

const authSuccess = (data) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: data.idToken,
        userId: data.localId
    }
}

const authFailed = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: error
    }
}

export const logout = () => {
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
                dispatch(authSuccess(response.data));
                dispatch(checkAuthTimeout(response.data.expiresIn))
            })
            .catch(error => {
                console.log(error);
                dispatch(authFailed(error.response.data.error));
            });
    }
}