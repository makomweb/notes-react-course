# Component Deep Dive

## Class-based vs. Functional Components

| class based | functional |
|--- | --- |
| *class XY extends Component* | *const XY = props => { ... }* |
| Access state | Access to state (useState())
| Lifecycle hooks | Lifecycle hooks | 
| Access state via _this_ | Access state via _props_ |
| Use if you need to manage state or access to _Lifecyle hooks_ and you don't want to use _React Hooks_ | Use in all other cases

## Lifecycle hooks for component creation

~~~js
constructor(props) {
    super(props);
    // runs at first - once the class was instantiated
    // call super here!
    // set up state here!
    // don't cause side effects here!
}

static getDerivedStateFromProps(props, state) {
    // runs after the constructor
    // sync state
    // don't cause side effects here!
}

render() {
    // runs in order to prepare the component to be rendered
    // prepare and structure JSX code
}

componentWillMount() {
    // runs before component was mounted
    // DEPRECATED!
}

componentDidMount() {
    // runs at last
    // cause side effects here!
    // don't update the state here! it would trigger re-rendering
}
~~~

## Lifecycle hooks for updating components

~~~js
static getDerivedStateFromProps(props, state) {
    // sync state to props
    // don't cause side effects here!
}

shouldComponentUpdate(nextProps, nextState) {
    // evaluation if component needs to be rerendered happens here
    // decide whether to continue or not
    // cause side effects
}

render() {
    // prepare and structure JSX code
}

getSnapshotBeforeUpdate(prevProps, prevState) {
    // runs to capture last minute DOM operations
    // e.g. scroll positions
    // don't cause side effects here!
}

componentDidUpdate() {
    // cause side effects here
    // Don't update state here (triggers rerendering!)
}
~~~

## What is the equivalent for life cycle hooks in functional components?

~~~js
import React, { useEffect } from 'react';

const Function = (props) => {
    useEffect(() => { 
            console.log('[Function.js] useEffect()')
        }
    );

    // You can have as many useEffect() configurations as you wish.
    useEffect(() => {
        /* ommited */
    });

    
    useEffect(() => { 
            console.log('[Function.js] useEffect()')
        }, 
        [props.state] // evaluates if state has changed and if yes --> call useEffect()
    );

    useEffect(() => { 
            console.log('[Function.js] useEffect()')
        }, 
        [] // useEffect is called only once - similar to componentDidMount()
    );

    useEffect(() => { 
            console.log('[Function.js] useEffect()')
        }, 
        [],
        return (() => {
            // this code is executed when the component is unmounted
            // use it for cleanup work!
        });
    );

    // having a 2nd useEffect() "subscription" can be used to cancel a pending operation! whenever the component is re-rendered
    useEffect(() => { 
            console.log('[Function.js] useEffect()')
        },
        return (() => {
            // this code is executed when the component is unmounted
            // use it for cleanup work!
        });
    );
}

~~~