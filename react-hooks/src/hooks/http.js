import { useReducer } from 'react';

const httpReducer = (state, action) => {
    const { type } = action;
    switch (type) {
        case 'REQUEST': return { loading: true, error: null }
        case 'FINISHED': return { ...state, loading: false }
        case 'FAILED': return { loading: false, error: action.error }
        case 'CLEAR': return { ...state, error: null }
        default: throw new Error('Should not get here!');
    }
}

// `https://react-hooks-update-29adc-default-rtdb.firebaseio.com/ingredients/${id}.json`

const useHttp = () => {
    const [httpState, reduceHttpState] = useReducer(httpReducer, { loading: false, error: null });

    const sendRequest = (url, method, body) => {
        reduceHttpState({ type: 'REQUEST' });
        fetch(url,
            {
                method: method,
                body: body,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                // TODO reduceIngredients({ type: 'REMOVE', id: id });
            })
            .catch(error => {
                reduceHttpState({ type: 'FAILED', error: 'Removing ingredient has failed!' });
            })
            .finally(() => {
                reduceHttpState({ type: 'FINISHED' });
            });
    }
}

export default useHttp;