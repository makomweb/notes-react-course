import * as actionTypes from './actions';

export const increment = () => {
    return {
        type: actionTypes.INC
    };
}

export const decrement = () => {
    return {
        type: actionTypes.DEC
    };
}

export const add = (val) => {
    return {
        type: actionTypes.ADD,
        value: val
    };
}

export const sub = (val) => {
    return {
        type: actionTypes.SUB,
        value: val
    };
}