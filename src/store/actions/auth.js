import * as actionTypes from './actionTypes';

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

const authFailed = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: error
    }
}

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());
    }
}