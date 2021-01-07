import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useFetchIngredients } from '../../hooks/http';

import Card from '../UI/Card';
import ErrorModal from '../UI/ErrorModal';
import './Search.css';

const Search = React.memo(props => {
  const { provideIngredients } = props;
  const [enteredFilter, setEnteredFilter] = useState('');
  const inputRef = useRef();
  const { issue, loading, error, ingredients, clear } = useFetchIngredients();

  useEffect(() => {
    if (ingredients) {
      provideIngredients(ingredients);
    }
  }, [ingredients, provideIngredients]);

  useEffect(() => {
    const timer = setTimeout(() => {
      // if previous value is the same like current value (note: it changes when typing!)
      if (enteredFilter === inputRef.current.value) {
        issue(enteredFilter);
      }
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [enteredFilter, provideIngredients, inputRef, issue]);

  const clearError = useCallback(() => {
    clear();
  }, [clear]);

  return (
    <section className="search">
      {error ? <ErrorModal onClose={clearError}>{error}</ErrorModal> : null}
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input type="text"
            ref={inputRef}
            value={enteredFilter}
            onChange={event => setEnteredFilter(event.target.value)} />
          {loading ? <span>loading...</span> : null}
        </div>
      </Card>
    </section>
  );
});

export default Search;
