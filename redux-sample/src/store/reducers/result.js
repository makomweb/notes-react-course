import * as actions from '../../store/actions/actions';
import { updateObject } from '../utility';

const initialState = {
    results: []
}

const reduceResults = (state = initialState, action) => {
    switch (action.type) {
        case (actions.STORE):
            {
                const updatedArray = state.results.concat({
                    id: new Date(),
                    value: action.result
                });
                return updateObject(state, {
                    results: updatedArray
                });
            }

        case (actions.REMOVE):
            {
                const updatedArray = state.results.filter(result => result.id !== action.id);
                return updateObject(state, {
                    results: updatedArray
                });
            }
    }
    return state;
};

export default reduceResults;