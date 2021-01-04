import React, { useState } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

function Ingredients() {
  const [userIngredients, setUserIngredients] = useState([
    //{ id: Math.random().toString(), title: 'Apples', amount: '3' }
  ]);

  const onIngredientAdded = ingredient => {
    setUserIngredients(prevIngredients => [...prevIngredients, {
      id: Math.random().toString(),
      ...ingredient // spread operator adds all key-value-pairs to this object
    }]);
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
