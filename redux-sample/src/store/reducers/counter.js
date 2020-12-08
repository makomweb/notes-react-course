import * as actions from '../../store/actions/actions';

const initialState = {
    counter: 0
}

const reduceCounter = (state = initialState, action) => {
    switch (action.type) {
        case (actions.INC):
            return {
                ...state,
                counter: state.counter + 1
            }
        case (actions.DEC):
            return {
                ...state,
                counter: state.counter + 1
            }
        case (actions.ADD):
            return {
                ...state,
                counter: state.counter + action.value
            }
        case (actions.SUB):
            return {
                ...state,
                counter: state.counter - action.value
            }
    }
    return state;
};

export default reduceCounter;