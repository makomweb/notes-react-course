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
  const remove = useRemoveIngredient();
  const create = useCreateIngredient();

  useEffect(() => {
    if (remove.id) {
      reduceIngredients({ type: 'REMOVE', id: remove.id });
    }
  }, [remove.id]);

  useEffect(() => {
    if (create.ingredient) {
      reduceIngredients({ type: 'ADD', ingredient: create.ingredient });
    }
  }, [create.ingredient]);

  const onIngredientAdded = useCallback(ingredient => {
    create.sendRequest(ingredient);
  }, [create]);

  const onIngredientRemoved = useCallback(id => {
    remove.sendRequest(id);
  }, [remove]);


  const onLoadIngredients = useCallback(ingredients => {
    reduceIngredients({ type: 'SET', ingredients: ingredients });
  }, []);

  const onErrorClose = useCallback(() => {
  }, []);

  const ingredientList = useMemo(() => {
    return (
      <IngredientList
        ingredients={ingredients}
        onRemoveItem={onIngredientRemoved} />
    );
  }, [ingredients, onIngredientRemoved]);

  const error = false;
  const loading = remove.loading || create.loading;
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
