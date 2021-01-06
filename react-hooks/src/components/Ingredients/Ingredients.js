import React, { useReducer, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';
import ErrorModal from '../UI/ErrorModal';

const ingredientReducer = (state, action) => {
  const { type } = action;
  switch (type) {
    case 'SET': return action.ingredients;
    case 'ADD': return [...state, action.ingredient];
    case 'REMOVE': return state.filter(i => i.id !== action.id);
    default:
      throw new Error('Should not get here!');
  }
}

const httpReducer = (state, action) => {
  const { type } = action;
  switch (type) {
    case 'REQUEST': return { loading: true, error: null }
    case 'FINISHED': return { ...state, loading: false }
    case 'FAILED': return { loading: false, error: action.error }
    case 'CLEAR': return { ...state, error: null }
    default: throw new Error('Should not get here!');
  }
}

function Ingredients() {
  //const [userIngredients, setUserIngredients] = useState([]);
  const [userIngredients, reduceIngredients] = useReducer(ingredientReducer, []);
  /*
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  */
  const [httpState, reduceHttpState] = useReducer(httpReducer, { loading: false, error: null });

  const onIngredientAdded = ingredient => {
    //setIsLoading(true);
    reduceHttpState({ type: 'REQUEST' });

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
        /*
        setUserIngredients(prevIngredients => [...prevIngredients, {
          id: responseData.name,
          ...ingredient
        }]);
        */
        reduceIngredients({
          type: 'ADD', ingredient: {
            id: responseData.name,
            ...ingredient
          }
        });
      })
      .catch(error => {
        //setError('Adding ingredient has failed! ', error);
        reduceHttpState({ type: 'FAILED', error: 'Adding ingredient has failed!' });
      })
      .finally(() => {
        reduceHttpState({ type: 'FINISHED' });
      });
  }

  const onIngredientRemoved = id => {
    //setIsLoading(true);
    reduceHttpState({ type: 'REQUEST' });

    fetch(`https://react-hooks-update-29adc-default-rtdb.firebaseio.com/ingredients/${id}.json`,
      {
        method: 'DELETE'
      })
      .then(response => {
        /*
        const newIngredients = userIngredients.filter(obj => obj.id !== id);
        setUserIngredients(newIngredients);
        */
        reduceIngredients({ type: 'REMOVE', id: id });
      })
      .catch(error => {
        //setError('Removing ingredient has failed! ', error);
        reduceHttpState({ type: 'FAILED', error: 'Removing ingredient has failed!' });
      })
      .finally(() => {
        reduceHttpState({ type: 'FINISHED' });
      });
  }

  const onLoadIngredients = useCallback(ingredients => {
    //setUserIngredients(ingredients);
    reduceIngredients({ type: 'SET', ingredients: ingredients });
  }, []);

  const onErrorClose = () => {
    /*
    setError(null);
    setIsLoading(false);
    */
    reduceHttpState({ type: 'CLEAR' });

    // Note: both updates are batched together which causes a single render cycle of the component!
  }

  //const { error, loading } = httpState;
  return (
    <div className="App">
      {httpState.error ? <ErrorModal onClose={onErrorClose}>{httpState.error}</ErrorModal> : null}
      <IngredientForm addIngredient={onIngredientAdded} isLoading={httpState.loading} />
      <section>
        <Search loadIngredients={onLoadIngredients} />
        <IngredientList ingredients={userIngredients} onRemoveItem={onIngredientRemoved} />
      </section>
    </div>
  );
}

export default Ingredients;
