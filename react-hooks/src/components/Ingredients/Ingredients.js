import React, { useState, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';
import ErrorModal from '../UI/ErrorModal';

function Ingredients() {
  const [userIngredients, setUserIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const onIngredientAdded = ingredient => {
    setIsLoading(true);

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
        setUserIngredients(prevIngredients => [...prevIngredients, {
          id: responseData.name,
          ...ingredient
        }]);
      })
      .catch(error => {
        setError('Adding ingredient has failed! ', error);
      })
      .finally(() => setIsLoading(false));
  }

  const onIngredientRemoved = id => {
    setIsLoading(true);

    fetch(`https://react-hooks-update-29adc-default-rtdb.firebaseio.com/ingredients/${id}.json`,
      {
        method: 'DELETE'
      })
      .then(response => {
        const newIngredients = userIngredients.filter(obj => obj.id !== id);
        setUserIngredients(newIngredients);
      })
      .catch(error => {
        setError('Removing ingredient has failed! ', error);
      })
      .finally(() => setIsLoading(false));
  }

  const onLoadIngredients = useCallback(ingredients => {
    setUserIngredients(ingredients);
  }, []);

  const onErrorClose = () => {
    setError(null);
    setIsLoading(false);

    // Note: both updates are batched together which causes a single render cycle of the component!
  }

  return (
    <div className="App">
      {error ? <ErrorModal onClose={onErrorClose}>{error}</ErrorModal> : null}
      <IngredientForm addIngredient={onIngredientAdded} isLoading={isLoading} />
      <section>
        <Search loadIngredients={onLoadIngredients} />
        <IngredientList ingredients={userIngredients} onRemoveItem={onIngredientRemoved} />
      </section>
    </div>
  );
}

export default Ingredients;
