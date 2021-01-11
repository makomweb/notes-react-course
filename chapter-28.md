# Replace Redux with React Hooks

It's completely okay to not replace Redux with React Hooks.

Context is great for low frequency updates. It's missing optimizations.

## a global custom state (store)

~~~js
import { useEffect, useState } from 'react';

let globalState = {};
let listeners = [];
let actions = {};

export const useStore = () => {
  const setState = useState(globalState)[1];

  const dispatch = (actionIdentifer, payload) => {
  const a = actions[actionIdentifer];
  /* ... omitted ... */
}
~~~

The objects could also be part of the hook directly.
Then every using component would have it's own set of objects and state would not be shared anymore.

Replacing Redux with React and React hooks is an alternative to manage state in an app.