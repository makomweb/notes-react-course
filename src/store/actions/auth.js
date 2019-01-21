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

const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
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
                console.log('[auth - success]', response);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(err => {
                console.log('[auth - error]', err);
                dispatch(authFail(err.response.data.error));
            });
    }
}