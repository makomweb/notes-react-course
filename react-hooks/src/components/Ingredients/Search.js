import React, { useState, useEffect, useRef } from 'react';
import { useFetchIngredients } from '../../hooks/http';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
  const { loadIngredients } = props;
  const [enteredFilter, setEnteredFilter] = useState('');
  const inputRef = useRef();
  const fetch = useFetchIngredients();

  /*
  useEffect(() => {
    loadIngredients(fetch.ingredients);
  }, [fetch.ingredients]);

  useEffect(() => {
    fetch.sendRequest('');
  }, []);
  */
  /*
  useEffect(() => {
    const timer = setTimeout(() => {
      // if previous value is the same like current value (note: it changes when typing!)
      if (enteredFilter === inputRef.current.value) {      
        fetch.sendRequest(enteredFilter);
      }
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [enteredFilter, loadIngredients, inputRef, fetch]);
  */

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input type="text"
            ref={inputRef}
            value={enteredFilter}
            onChange={event => setEnteredFilter(event.target.value)} />
        </div>
      </Card>
    </section>
  );
});

export default Search;
