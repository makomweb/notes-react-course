import React, { useState } from 'react';

import Card from '../UI/Card';
import './IngredientForm.css';

const IngredientForm = React.memo(props => {
  const inputState = useState({ title: '', amount: '' });

  const submitHandler = event => {
    event.preventDefault();
    // ...
  };

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input type="text" id="title"
              value={inputState[0].title} // inputState[0] --- to access the values
              onChange={event => {
                const newTitle = event.target.value;
                inputState[1](prevInputState => // inputState[1] --- to access the functions to manipulate state
                ({
                  title: newTitle,
                  amount: prevInputState.amount
                }))
              }} />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input type="number" id="amount"
              value={inputState[0].amount} // inputState[0] --- to access the values
              onChange={event => {
                const newAmount = event.target.value;
                inputState[1](prevInputState => // inputState[1] --- to access the functions to manipulate state
                ({
                  amount: newAmount,
                  title: prevInputState.title
                }))
              }} />
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;