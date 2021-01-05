import React, { useState, useEffect } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
  const { loadIngredients } = props;
  const [enteredFilter, setEnteredFilter] = useState('');

  useEffect(() => {
    setTimeout(() => {
      const query = enteredFilter.length === 0
        ? ''
        : `?orderBy="title"&equalTo="${enteredFilter}"`;

      fetch('https://react-hooks-update-29adc-default-rtdb.firebaseio.com/ingredients.json' + query)
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
          loadIngredients(ingredients);
        })
        .catch(error => {
          console.log('fetching ingredients has failed! ', error);
        });
    }, 500);
  }, [enteredFilter, loadIngredients]);

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input type="text"
            value={enteredFilter}
            onChange={event => setEnteredFilter(event.target.value)} />
        </div>
      </Card>
    </section>
  );
});

export default Search;
