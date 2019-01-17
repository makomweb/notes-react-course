import * as actionTypes from './actionTypes';
import axios from 'axios';

// action creators for authentication

const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    }
}

const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: error
    }
}

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());

        console.log('[auth.js] ', email, password)
        const data = {
            email: email,
            password: password,
            returnSecureToken: true
        }

        axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBJCm83JVeTqMxl9MOA03PHA6ogt-Nkr-Y', data)
            .then(response => {
                console.log(response);
                dispatch(authSuccess(response.data));
            })
            .catch(error => {
                console.log(error);
                dispatch(authFail());
            });
    }
}