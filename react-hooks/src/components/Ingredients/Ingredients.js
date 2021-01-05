import React, { useState, useEffect } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

function Ingredients() {
  const [userIngredients, setUserIngredients] = useState([]);

  useEffect(() => {
    fetch('https://react-hooks-update-29adc-default-rtdb.firebaseio.com/ingredients.json')
      .then(response => response.json())
      .then(data => {
        const ingredients = [];
        for (const key in data) {
          ingredients.push({
            id: key,
            title: data[key].title,
            amount: data[key].amount
          });
        }
        setUserIngredients(ingredients);
      })
      .catch(error => {
        console.log('fetching ingredients has failed! ', error);
      });
  }, []);

  useEffect(() => {
    console.log('rendering ingredients ', userIngredients)
  }, [userIngredients]);

  const onIngredientAdded = ingredient => {
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
      });
  }

  const onIngredientRemoved = id => {
    const index = userIngredients.findIndex(obj => obj.id === id);
    if (index !== -1) {
      const newIngredients = userIngredients.splice(index, 1);
      setUserIngredients(newIngredients);
    }
  }

  const onLoadIngredients = ingredients => {
    //setUserIngredients(ingredients);
  }

  return (
    <div className="App">
      <IngredientForm addIngredient={onIngredientAdded} />
      <section>
        <Search loadIngredients={onLoadIngredients} />
        <IngredientList ingredients={userIngredients} onRemoveItem={onIngredientRemoved} />
      </section>
    </div>
  );
}

export default Ingredients;
