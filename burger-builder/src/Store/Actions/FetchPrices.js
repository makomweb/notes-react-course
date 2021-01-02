import * as actionTypes from './actionTypes';

export const fetchPrices = () => {
    return {
        type: actionTypes.FETCH_PRICES
    }
}

export const fetchPricesSuccess = (prices) => {
    return {
        type: actionTypes.FETCH_PRICES_SUCCESS,
        prices: prices
    };
}

export const fetchPricesFailed = () => {
    return {
        type: actionTypes.FETCH_PRICES_FAILED
    };
}