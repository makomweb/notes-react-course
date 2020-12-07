import * as actions from './actions';


const initialState = {
    counter: 0,
    results: []
}

const reducer = (state = initialState, action) => {
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

        case (actions.STORE):
            return {
                ...state,
                results: state.results.concat({
                    id: new Date(),
                    value: state.counter
                })
            }

        case (actions.DELETE):
            const updatedArray = state.results.filter(result => result.id !== action.id);
            return {
                ...state,
                results: updatedArray
            }
    }
    return state;
};

export default reducer;