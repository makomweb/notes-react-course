# React Hooks

- class based versus function components
- functional components
    - props in, JSX out
    - great for presentation
    - focused on one (few) purposes
- class based components
    - uses props and state
    - great for implementing business logic
    - orchestration
    - life cycle hooks can be hard to understand
- conversion between these two kinds of components is annoying

---
React hooks replace _class only functionalities_.
With this feature it is possible to rely on functional components completely.
---

## What are React Hooks?

- JS functions which can only be used from inside Functional Components or other React Hooks
- named _useXYZ()_ (convention)
- idea is to **expose** certain (possibly stateful) functionalities to functional components
- hooks are **highly re-usable** and independent for each component
- hooks allow you to **add state** to functional components and to **share** (possibly stateful) **logic across** components
- have nothing to do with *Lifecycle* methods (lifecycle hooks)
- introduced with React 16.8
- allow you to use functional components only
- hooks are for managing state, side effects (e.g. HTTP requests) & more
- build custom hooks to share stateful or stateless logic across multiple components

~~~js
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
~~~

## Understanding _useState()_

- function component `const MyComp = props => ...` calls `useState(initialState)`
- returns with 2 elements
    - state pointer
    - state update functions
- create state
- managed by React behind the scenes
- must be used on the root level of a functional React component

## Activate indexing on a Firebase property

Add the following to your rules in Firebase!

~~~js
{
  "rules": {
    ".read": "now < 1612306800000",  // 2021-2-3
    ".write": "now < 1612306800000",  // 2021-2-3
      "ingredients": {
        ".indexOn": ["title"]
      }
  }
}
~~~