# Redux - state management

- 3rd party lib independent from _React_
- abstraction on top of central store
- clear defined process of how the application state is changed
- action, reducers, triggers, props

## Redux with node.js

use `node .\redux-basics.js` to see the basics work

## Types of state

| type | example | should be handled by redux |
| --- | --- | --- |
| local UI state | show / hide backdrop | mostly handled within components |
| persistent state | all users, all posts, ... | stored on server / relevant slices managed via Redux |
| client state | is-authenticated, filter set by users, ... | managed via Reduy

## Useful links

- [Docs](https://redux.js.org/)
- [Core Concepts](https://redux.js.org/introduction/core-concepts)
- [Actions](https://redux.js.org/basics/actions)
- [Reducers](https://redux.js.org/basics/reducers)
- [FAQs](https://redux.js.org/faq)