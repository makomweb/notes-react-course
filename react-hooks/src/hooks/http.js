import { useReducer } from 'react';

const httpReducer = (state, action) => {
    const { type } = action;
    switch (type) {
        case 'REQUEST': return { loading: true, error: null, data: null }
        case 'FINISHED': return { ...state, loading: false, data: action.data }
        case 'FAILED': return { loading: false, error: action.error, data: null }
        case 'CLEAR': return { ...state, error: null, data: null }
        default: throw new Error('Should not get here!');
    }
}

// `https://react-hooks-update-29adc-default-rtdb.firebaseio.com/ingredients/${id}.json`

const useHttp = () => {
    const [httpState, reduceHttpState] = useReducer(httpReducer, {
        loading: false,
        error: null,
        data: null
    });

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
                return response.json();
            })
            .then(data => {
                reduceHttpState({ type: 'FINISHED', data: data });
            })
            .catch(error => {
                reduceHttpState({ type: 'FAILED', error: 'Removing ingredient has failed!' });
            })
            .finally(() => {
                reduceHttpState({ type: 'FINISHED' });
            });
    }

    return {
        loading: httpState.loading,
        data: httpState.data,
        error: httpState.error
    };
}

export default useHttp;