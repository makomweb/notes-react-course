import React, { useReducer, useCallback, useMemo } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';
import ErrorModal from '../UI/ErrorModal';

const ingredientReducer = (state, action) => {
  const { type } = action;
  switch (type) {
    case 'SET': return action.ingredients;
    case 'ADD': return [...state, action.ingredient];
    case 'REMOVE': return state.filter(i => i.id !== action.id);
    default:
      throw new Error('Should not get here!');
  }
}

function Ingredients() {
  const [userIngredients, reduceIngredients] = useReducer(ingredientReducer, []);
  
  const onIngredientAdded = useCallback(ingredient => {
    reduceHttpState({ type: 'REQUEST' });

    fetch('https://react-hooks-update-29adc-default-rtdb.firebaseio.com/ingredients.json',
      {
        method: 'POST',
        body: JSON.stringify(ingredient),
        header: { 'Content-Type': 'application/json' }
      })
      .then(response => {
        return response.json();
      })
      .then(responseData => {
        reduceIngredients({
          type: 'ADD', ingredient: {
            id: responseData.name,
            ...ingredient
          }
        });
      })
      .catch(error => {
        reduceHttpState({ type: 'FAILED', error: 'Adding ingredient has failed!' });
      })
      .finally(() => {
        reduceHttpState({ type: 'FINISHED' });
      });
  }, []); // '[]' ... no external dependencies (React ensures reducers do not change when re-rendering a component!)

  const onIngredientRemoved = useCallback(id => {
    reduceHttpState({ type: 'REQUEST' });

    fetch(`https://react-hooks-update-29adc-default-rtdb.firebaseio.com/ingredients/${id}.json`,
      {
        method: 'DELETE'
      })
      .then(response => {
        reduceIngredients({ type: 'REMOVE', id: id });
      })
      .catch(error => {
        reduceHttpState({ type: 'FAILED', error: 'Removing ingredient has failed!' });
      })
      .finally(() => {
        reduceHttpState({ type: 'FINISHED' });
      });
  }, []); // '[]' ... no external dependencies (React ensures reducers do not change when re-rendering a component!)


  const onLoadIngredients = useCallback(ingredients => {
    reduceIngredients({ type: 'SET', ingredients: ingredients });
  }, []); // '[]' ... no external dependencies (React ensures reducers do not change when re-rendering a component!)

  const onErrorClose = useCallback(() => {
    reduceHttpState({ type: 'CLEAR' });
  }, []); // '[]' ... no external dependencies (React ensures reducers do not change when re-rendering a component!)

  const ingredientList = useMemo(() => {
    return (
      <IngredientList
        ingredients={userIngredients}
        onRemoveItem={onIngredientRemoved} />
    );
  }, [userIngredients, onIngredientRemoved]); // dependencies which indicate when to re-render

  const { error, loading } = httpState;
  return (
    <div className="App">
      {error ? <ErrorModal onClose={onErrorClose}>{error}</ErrorModal> : null}
      <IngredientForm addIngredient={onIngredientAdded} isLoading={loading} />
      <section>
        <Search loadIngredients={onLoadIngredients} />
        {ingredientList}
      </section>
    </div>
  );
}

export default Ingredients;
