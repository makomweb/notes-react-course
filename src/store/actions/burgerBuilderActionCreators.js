import * as actionTypes from './actionTypes'
import AxiosInstance from '../../AxiosInstance';

export const createAddIngredientAction = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
}

export const createRemoveIngredientAction = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
}

export const createSetIngredientsAction = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

export const createFetchIngredientsFailedAction = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const createInitIngredientsCreator = () => {
    return dispatch => {
        AxiosInstance.get('ingredients.json')
            .then(response => {
                dispatch(createSetIngredientsAction(response.data))
            })
            .catch(error => {
                dispatch(createFetchIngredientsFailedAction(error));
            });
    }
}