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
                console.log('[auth - success]', idToken, localId, expiresIn);
                dispatch(authSuccess(idToken, localId));
                dispatch(checkAuthTimeout(expiresIn));
            })
            .catch(err => {
                console.log('[auth - error]', err);
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