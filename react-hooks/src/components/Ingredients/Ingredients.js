import React, { useReducer, useCallback, useMemo, useEffect } from 'react';

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
    case 'REMOVE': {
      console.log('going to remove ', action.id);
      return state.filter(i => i.id !== action.id);
    }
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
    // reduceHttpState({ type: 'REQUEST' });

    // fetch('https://react-hooks-update-29adc-default-rtdb.firebaseio.com/ingredients.json',
    //   {
    //     method: 'POST',
    //     body: JSON.stringify(ingredient),
    //     header: { 'Content-Type': 'application/json' }
    //   })
    //   .then(response => {
    //     return response.json();
    //   })
    //   .then(responseData => {
    //     reduceIngredients({
    //       type: 'ADD', ingredient: {
    //         id: responseData.name,
    //         ...ingredient
    //       }
    //     });
    //   })
    //   .catch(error => {
    //     reduceHttpState({ type: 'FAILED', error: 'Adding ingredient has failed!' });
    //   })
    //   .finally(() => {
    //     reduceHttpState({ type: 'FINISHED' });
    //   });
    create.sendRequest(ingredient);
  }, [create]);

  const onIngredientRemoved = useCallback(id => {
    // reduceHttpState({ type: 'REQUEST' });

    // fetch(`https://react-hooks-update-29adc-default-rtdb.firebaseio.com/ingredients/${id}.json`,
    //   {
    //     method: 'DELETE'
    //   })
    //   .then(response => {
    //     reduceIngredients({ type: 'REMOVE', id: id });
    //   })
    //   .catch(error => {
    //     reduceHttpState({ type: 'FAILED', error: 'Removing ingredient has failed!' });
    //   })
    //   .finally(() => {
    //     reduceHttpState({ type: 'FINISHED' });
    //   });
    remove.sendRequest(id);
  }, [remove]);


  const onLoadIngredients = useCallback(ingredients => {
    reduceIngredients({ type: 'SET', ingredients: ingredients });
  }, []); // '[]' ... no external dependencies (React ensures reducers do not change when re-rendering a component!)

  const onErrorClose = useCallback(() => {
    //reduceHttpState({ type: 'CLEAR' });
  }, []); // '[]' ... no external dependencies (React ensures reducers do not change when re-rendering a component!)

  const ingredientList = useMemo(() => {
    return (
      <IngredientList
        ingredients={ingredients}
        onRemoveItem={onIngredientRemoved} />
    );
  }, [ingredients, onIngredientRemoved]); // dependencies which indicate when to re-render

  //const { error, loading } = httpState;

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
