import * as actionTypes from '../Actions/actionTypes';
import AxiosInstance from '../../AxiosInstance';

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    };
}

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    };
}

const updatePrices = (prices) => {
    return {
        type: actionTypes.UPDATE_PRICES,
        prices: prices
    };
}

export const fetchPricesFailed = () => {
    return {
        type: actionTypes.FETCH_PRICES_FAILED
    };
}

export const fetchPrices = () => {
    return dispatch => {
        AxiosInstance.get('/prices.json')
            .then(response => {
                dispatch(updatePrices(response.data));
            })
            .catch(error => {
                dispatch(fetchPricesFailed());
            });
    }
}