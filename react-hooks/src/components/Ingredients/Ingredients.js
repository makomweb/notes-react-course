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
    default: throw new Error('Should not get here!');
  }
}

function Ingredients() {
  const [ingredients, reduceIngredients] = useReducer(ingredientReducer, []);
  const [error, setError] = useState();
  const remove = useRemoveIngredient();
  const create = useCreateIngredient();

  useEffect(() => {
    console.log('useEffect() on remove.id');
    if (remove.id) {
      reduceIngredients({ type: 'REMOVE', id: remove.id });
    }
  }, [remove.id]);

  useEffect(() => {
    console.log('useEffect() on create.ingredient');
    if (create.ingredient) {
      reduceIngredients({ type: 'ADD', ingredient: create.ingredient });
    }
  }, [create.ingredient]);

  useEffect(() => {
    console.log('useEffect() on create.error');
    setError(create.error);
  }, [create.error]);

  useEffect(() => {
    console.log('useEffect() on remove.error');
    setError(remove.error);
  }, [remove.error]);

  const onIngredientAdded = useCallback(ingredient => {
    create.issue(ingredient);
  }, [create]);

  const onIngredientRemoved = useCallback(id => {
    remove.issue(id);
  }, [remove]);

  const onIngredientsLoaded = useCallback(loaded => {
    reduceIngredients({ type: 'SET', ingredients: loaded });
  }, []);

  const onModalClosed = useCallback(() => {
    setError(null);
  }, []);

  console.log('rendering ingredients: ', ingredients);

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
        <Search provideIngredients={onIngredientsLoaded} />
        {ingredientList}
      </section>
    </div>
  );
}

export default Ingredients;
