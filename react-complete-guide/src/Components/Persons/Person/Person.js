import React, { Component } from 'react';
import classes from './Person.css';

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
            <div className={classes.Person} >
                <p onClick={click}>I'm a {name} an I am {age} years old.</p>
                <p>{children}</p>
                <input type="text" onChange={changed} value={name} />
            </div>
        );
    }
}

export default Person;