import React, { Component, Fragment } from 'react';
import classes from './Person.css';
import WithClass from '../../../HOC/WithClass.js';

class Person extends Component {
    state = {};
    constructor(props) {
        super(props);
        console.log('[Person.js] constructor()');
    }
    static getDerivedStateFromProps(props, state) {
        console.log('[Person.js] getDerivedStateFromProps()');
        return state;
    }

    // componentWillMount() {
    //     console.log('[Person.js] componentWillMount()');
    // }

    componentDidMount() {
        console.log('[Person.js] componentDidMount()');
    }

    componentWillUnmount() {
        console.log('[Person.js] componentWillUnmount()');
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('[Person.js] getSnapshotBeforeUpdate()');
        return prevState;
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('[Person.js] shouldComponentUpdate()');
        return true;
    }

    componentDidUpdate() {
        console.log('[Person.js] componentDidUpdate()');
    }

    render() {
        console.log('[Person.js] render()');
        const { age, name, click, children, changed } = this.props;
        return (
            <Fragment className={classes.Person} >
                <p onClick={click}>I'm a {name} an I am {age} years old.</p>
                <p>{children}</p>
                <input type="text" onChange={changed} value={name} />
            </Fragment>
        );
    }
}

export default WithClass(Person, classes.Person);