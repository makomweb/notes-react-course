import React, { useState, useEffect } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

function Ingredients() {
  const [userIngredients, setUserIngredients] = useState([
    //{ id: Math.random().toString(), title: 'Apples', amount: '3' }
  ]);

  useEffect(() => { // useEffect() acts like componentDidUpdate() in class-based components
    /* runs after the component was rendered! */
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
  // ^ with the empty array as the second argument useEffect() acts like componentDidMount() in class-based components

  useEffect(() => console.log('rendering ingredients'));

  const onIngredientAdded = ingredient => {
    // browser-API
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
    const newIngredients = userIngredients.filter(obj => obj.id !== id);
    setUserIngredients(newIngredients);
  }

  return (
    <div className="App">
      <IngredientForm addIngredient={onIngredientAdded} />
      <section>
        <Search />
        {/* Need to add list here! */}
        <IngredientList ingredients={userIngredients} onRemoveItem={onIngredientRemoved} />
      </section>
    </div>
  );
}

export default Ingredients;
