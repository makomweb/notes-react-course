import { useCallback, useReducer } from 'react';

const reducer = (state, action) => {
    const { type } = action;
    switch (type) {
        case 'ISSUED': return { loading: true }
        case 'CREATION_FINISHED': return { loading: false, ingredient: action.ingredient }
        case 'REMOVAL_FINISHED': return { loading: false, id: action.id }
        case 'FILTER_FINISHED': return { loading: false, ingredients: action.ingredients }
        case 'FAILED': return { loading: false, error: action.error }
        default: throw new Error('Should not get here!');
    }
}

export const useCreateIngredient = () => {
    const [state, reduce] = useReducer(reducer, {
        loading: false,
        ingredient: null,
        error: null,
    });

    const sendRequest = useCallback(ingredient => {
        reduce({ type: 'ISSUED' });
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
                reduce({ type: 'CREATION_FINISHED', ingredient: { id: data.name, ...ingredient } });
            })
            .catch(error => {
                reduce({ type: 'FAILED', error: 'Creation has failed!' });
            });
    }, []);

    return {
        ...state,
        sendRequest: sendRequest
    };
}

export const useRemoveIngredient = () => {
    const [state, reduce] = useReducer(reducer, {
        loading: false,
        id: null,
        error: null,
    });

    const sendRequest = useCallback(id => {
        reduce({ type: 'ISSUED' });
        fetch(`https://react-hooks-update-29adc-default-rtdb.firebaseio.com/ingredients/${id}.json`,
            {
                method: 'DELETE',
            })
            .then(response => {
                reduce({ type: 'REMOVAL_FINISHED', id: id });
            })
            .catch(error => {
                reduce({ type: 'FAILED', error: 'Removal has failed!' });
            });
    }, []);

    return {
        ...state,
        sendRequest: sendRequest
    };
}

export const useFetchIngredients = () => {
    const [state, reduce] = useReducer(reducer, {
        loading: false,
        ingredients: [],
        error: null,
    });

    const sendRequest = useCallback(filter => {
        reduce({ type: 'ISSUED' });
        const query = filter.length === 0
            ? ''
            : `?orderBy="title"&equalTo="${filter}"`;

        fetch('https://react-hooks-update-29adc-default-rtdb.firebaseio.com/ingredients.json' + query,
            {
                method: 'GET'
            })
            .then(response => response.json())
            .then(data => {
                const items = [];
                for (const key in data) {
                    items.push({
                        id: key,
                        title: data[key].title,
                        amount: data[key].amount
                    });
                }

                reduce({ type: 'FILTER_FINISHED', ingredients: items });
            })
            .catch(error => {
                reduce({ type: 'FAILED', error: 'Removal has failed!' });
            });
    }, []);

    return {
        ...state,
        sendRequest: sendRequest
    };
}
