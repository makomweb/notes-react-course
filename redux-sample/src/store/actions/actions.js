export const INC = 'INC';
export const DEC = 'DEC';
export const ADD = 'ADD';
export const SUB = 'SUB';
export const STORE = 'STORE';
export const REMOVE = 'REMOVE';

export const increment = () => {
    return {
        type: INC
    };
}

export const decrement = () => {
    return {
        type: DEC
    };
}

export const add = (val) => {
    return {
        type: ADD,
        value: val
    };
}

export const sub = (val) => {
    return {
        type: INC,
        value: val
    };
}

export const store = (obj) => {
    return {
        type: STORE,
        result: res
    };
}

export const remove = (id) => {
    return {
        type: REMOVE,
        id: id
    };
}