import * as actionTypes from './actions';

export const save = (res) => {
    return function (dispatch, getState) {
        setTimeout(() => {
            dispatch(store(res))
        }, 2000);
    }
}

const store = (res) => {
    return {
        type: actionTypes.STORE,
        result: res
    };
}

export const remove = (id) => {
    return {
        type: actionTypes.REMOVE,
        id: id
    };
}