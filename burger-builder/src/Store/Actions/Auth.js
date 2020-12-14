import * as actionTypes from '../Actions/actionTypes';

const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

const authSuccess = (data) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        data: data
    }
}

const authFailed = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: error
    }
}

export const authenticate = (email, password) => {
    return dispatch => {
        dispatch(authStart());

    }
}