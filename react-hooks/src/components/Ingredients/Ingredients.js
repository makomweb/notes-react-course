import React, { useReducer, useState, useCallback, useMemo, useEffect } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';
import ErrorModal from '../UI/ErrorModal';
import { useCreateIngredient, useRemoveIngredient } from '../../hooks/http';

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
  const [ingredients, reduceIngredients] = useReducer(ingredientReducer, []);
  const [error, setError] = useState();
  const remove = useRemoveIngredient();
  const create = useCreateIngredient();

  useEffect(() => {
    if (remove.id) {
      reduceIngredients({ type: 'REMOVE', id: remove.id });
    }
    setError(remove.error);
  }, [remove.id, remove.error]);

  useEffect(() => {
    if (create.ingredient) {
      reduceIngredients({ type: 'ADD', ingredient: create.ingredient });
    }
    setError(create.error);
  }, [create.ingredient, create.error]);

  const onIngredientAdded = useCallback(ingredient => {
    create.sendRequest(ingredient);
  }, [create]);

  const onIngredientRemoved = useCallback(id => {
    remove.sendRequest(id);
  }, [remove]);


  const onIngredientsLoaded = useCallback(ingredients => {
    reduceIngredients({ type: 'SET', ingredients: ingredients });
  }, []);

  const onModalClosed = useCallback(() => {
    setError(null);
  }, []);

  const ingredientList = useMemo(() => {
    return (
      <IngredientList
        ingredients={ingredients}
        onRemoveItem={onIngredientRemoved} />
    );
  }, [ingredients, onIngredientRemoved]);

  const loading = remove.loading || create.loading;
  return (
    <div className="App">
      {error ? <ErrorModal onClose={onModalClosed}>{error}</ErrorModal> : null}
      <IngredientForm addIngredient={onIngredientAdded} isLoading={loading} />
      <section>
        <Search loadIngredients={onIngredientsLoaded} />
        {ingredientList}
      </section>
    </div>
  );
}

export default Ingredients;
