import * as actions from '../../store/actions/actions';
import { updateObject } from '../utility';

const initialState = {
    counter: 0
}

const reduceCounter = (state = initialState, action) => {
    switch (action.type) {
        case (actions.INC):
            return updateObject(state, {
                counter: state.counter + 1
            });
        case (actions.DEC):
            return updateObject(state, {
                counter: state.counter - 1
            });
        case (actions.ADD):
            return updateObject(state, {
                counter: state.counter + action.value
            });
        case (actions.SUB):
            return updateObject(state, {
                counter: state.counter - action.value
            });
    }
    return state;
};

export default reduceCounter;