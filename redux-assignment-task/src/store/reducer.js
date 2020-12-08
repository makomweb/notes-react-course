import * as actions from './actionTypes';

const initialState = {
    persons: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.ADD_PERSON:
            return {
                persons: state.persons.concat(action.payload)
            };
        case actions.DELETE_PERSON:
            return {
                persons: state.persons.filter(person => person.id !== action.payload)
            };
        default: return state;
    }
}

export default reducer;