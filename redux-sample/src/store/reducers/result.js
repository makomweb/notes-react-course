import * as actions from '../../store/actions/actions';

const initialState = {
    results: []
}

const reduceResults = (state = initialState, action) => {
    switch (action.type) {
        case (actions.STORE):
            return {
                ...state,
                results: state.results.concat({
                    id: new Date(),
                    value: action.result
                })
            }

        case (actions.REMOVE):
            const updatedArray = state.results.filter(result => result.id !== action.id);
            return {
                ...state,
                results: updatedArray
            }
    }
    return state;
};

export default reduceResults;