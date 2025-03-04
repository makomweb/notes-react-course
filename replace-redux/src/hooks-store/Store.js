import { useEffect, useState } from 'react';

let globalState = {};
let listeners = [];
let actions = {};

export const useStore = (shouldListen = true) => {
  const setState = useState(globalState)[1];
  const dispatch = (actionIdentifer, payload) => {
    const action = actions[actionIdentifer];
    const newState = action(globalState, payload);
    globalState = { ...globalState, ...newState };
    for (const listener of listeners) {
      listener(globalState);
    }
  }

  useEffect(() => {
    if (shouldListen) {
      listeners.push(setState);
    }
    return () => {
      if (shouldListen) {
        listeners = listeners.filter(obj => obj !== setState);
      }
    }
  }, [setState, shouldListen]);

  return [globalState, dispatch];
}

export const initStore = (userActions, intialState) => {
  if (intialState) {
    globalState = { ...globalState, ...intialState };
  }
  actions = { ...actions, ...userActions };
}