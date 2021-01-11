import { useEffect, useState } from 'react';

let globalState = {};
let listeners = [];
let actions = {};

export const useStore = () => {
  const setState = useState(globalState)[1];

  const dispatch = (actionIdentifer, payload) => {
    const a = actions[actionIdentifer];

    console.log('dispatching action ');
    console.log('id: ', actionIdentifer);
    console.log('actions: ', actions);
    console.log('global state: ', globalState);
    console.log('action: ', a);

    const newState = a(globalState, payload);

    globalState = { ...globalState, ...newState };

    for (const listener of listeners) {
      listener(globalState);
    }
  }

  useEffect(() => {
    listeners.push(setState);
    return () => {
      listeners = listeners.filter(obj => obj !== setState);
    };
  }, [setState]);

  return [globalState, dispatch];
}


export const initStore = (userActions, intialState) => {
  if (intialState) {
    globalState = { ...globalState, ...intialState };
  }
  actions = { ...actions, ...userActions };

  console.log('global state is: ', globalState);
  console.log('actions are: ', actions);
}