import * as actions from '../Actions/actionTypes';
import { updateObject } from '../Utility';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
};

const authStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false
    });
}

const authFailed = (state, action) => {
    return updateObject(state, {
        token: null,
        userId: null,
        error: action.error,
        loading: false
    });
}

const authLogout = (state, action) => {
    return updateObject(state, initialState);
}

const setAuthRedirectPath = (state, action) => {
    return updateObject(state, {
        authRedirectPath: action.path
    });
}

export const reduce = (state = initialState, action) => {
    const { type } = action;
    switch (type) {
        case actions.AUTH_START: return authStart(state, action);
        case actions.AUTH_SUCCESS: return authSuccess(state, action);
        case actions.AUTH_FAILED: return authFailed(state, action);
        case actions.AUTH_LOGOUT: return authLogout(state, action);
        case actions.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action);
        default: return state;
    }
}

export default reduce;