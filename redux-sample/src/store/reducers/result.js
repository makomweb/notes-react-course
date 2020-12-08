import * as actions from '../../store/actions/actions';
import { updateObject } from '../utility';

const initialState = {
    results: []
}

const deleteResult = (state, action) => {
    const updatedArray = state.results.filter(result => result.id !== action.id);
    return updateObject(state, { results: updatedArray });
}

const storeResult = (state, action) => {
    const updatedArray = state.results.concat({
        id: new Date(),
        value: action.result
    });
    return updateObject(state, {
        results: updatedArray
    });
}

const reduceResults = (state = initialState, action) => {
    switch (action.type) {
        case (actions.STORE): return storeResult(state, action);
        case (actions.REMOVE): return deleteResult(state, action);
    }
    return state;
};

export default reduceResults;