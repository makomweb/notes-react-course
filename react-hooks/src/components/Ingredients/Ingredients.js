import React, { useState, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

function Ingredients() {
  const [userIngredients, setUserIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
        console.log('storing ingredient has failed! ', error);
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
        console.log('storing ingredient has failed! ', error);
      })
      .finally(() => setIsLoading(false));
  }

  const onLoadIngredients = useCallback(ingredients => {
    setUserIngredients(ingredients);
  }, []);

  return (
    <div className="App">
      <IngredientForm addIngredient={onIngredientAdded} isLoading={isLoading} />
      <section>
        <Search loadIngredients={onLoadIngredients} />
        <IngredientList ingredients={userIngredients} onRemoveItem={onIngredientRemoved} />
      </section>
    </div>
  );
}

export default Ingredients;
