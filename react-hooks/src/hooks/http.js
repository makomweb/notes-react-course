import { useCallback, useReducer } from 'react';

const createReducer = (state, action) => {
    const { type } = action;
    switch (type) {
        case 'REQUEST': return { loading: true }
        case 'FINISHED': {
            console.log('creation: ', action.ingredient);
            return { loading: false, ingredient: action.ingredient }
        }
        case 'FAILED': return { loading: false, error: action.error }
        default: throw new Error('Should not get here!');
    }
}

const removeReducer = (state, action) => {
    const { type } = action;
    switch (type) {
        case 'REQUEST': return { loading: true }
        case 'FINISHED': return { loading: false, id: action.id }
        case 'FAILED': return { loading: false, error: action.error }
        default: throw new Error('Should not get here!');
    }
}

export const useCreateIngredient = () => {
    const [state, reduce] = useReducer(createReducer, {
        loading: false,
        ingredient: null,
        error: null,
    });

    const sendRequest = useCallback(ingredient => {
        reduce({ type: 'REQUEST' });
        fetch('https://react-hooks-update-29adc-default-rtdb.firebaseio.com/ingredients.json',
            {
                method: 'POST',
                body: JSON.stringify(ingredient),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                return response.json();
            })
            .then(data => {
                reduce({ type: 'FINISHED', ingredient: { id: data.name, ...ingredient } });
            })
            .catch(error => {
                reduce({ type: 'FAILED', error: 'Request has failed!' });
            });
    }, []);

    return {
        ...state,
        sendRequest: sendRequest
    };
}

export const useRemoveIngredient = () => {
    const [state, reduce] = useReducer(removeReducer, {
        loading: false,
        id: null,
        error: null,
    });

    const sendRequest = useCallback(id => {
        reduce({ type: 'REQUEST' });
        fetch(`https://react-hooks-update-29adc-default-rtdb.firebaseio.com/ingredients/${id}.json`,
            {
                method: 'DELETE',
            })
            .then(response => {
                reduce({ type: 'FINISHED', id: id });
            })
            .catch(error => {
                reduce({ type: 'FAILED', error: 'Request has failed!' });
            });
    }, []);

    return {
        ...state,
        sendRequest: sendRequest
    };
}
