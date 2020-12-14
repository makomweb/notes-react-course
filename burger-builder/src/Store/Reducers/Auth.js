import * as actions from '../Actions/actionTypes';
import { updateObject } from '../Utility';

const initialState = {
    idToken: null,
    userId: null,
    error: null,
    loading: false
};

const authStart = (state, action) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        idToken: action.idToken,
        userId: action.userId,
        error: null,
        loading: false
    });
}

const authFailed = (state, action) => {
    return updateObject(state, {
        idToken: null,
        userId: null,
        error: action.error,
        loading: false
    });
}

export const reduce = (state = initialState, action) => {
    const { type } = action;
    switch (type) {
        case actions.AUTH_START: return authStart(state, action);
        case actions.AUTH_SUCCESS: return authSuccess(state, action);
        case actions.AUTH_FAILED: return authFailed(state, action);
        default: return state;
    }
}

export default reduce;