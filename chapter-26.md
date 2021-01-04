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
