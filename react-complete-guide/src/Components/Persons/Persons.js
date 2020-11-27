import React, { Component } from 'react';
import Person from './Person/Person.js'

class Persons extends Component {
    constructor(props) {
        super(props);
        console.log('[Persons.js] constructor()');
    }
    static getDerivedStateFromProps(props, state) {
        console.log('[Persons.js] getDerivedStateFromProps()');
        return state;
    }

    componentWillMount() {
        console.log('[Persons.js] componentWillMount()');
    }

    componentDidMount() {
        console.log('[Persons.js] componentDidMount()');
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('[Persons.js] getSnapshotBeforeUpdate()');
        return prevState;
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('[Persons.js] shouldComponentUpdate()');
        return true;
    }

    componentDidUpdate() {
        console.log('[Persons.js] componentDidUpdate()');
    }

    render() {
        console.log('[Persons.js] render()');
        const { props } = this;
        return props.persons
            .map((person, index) =>
                <Person
                    key={person.id}
                    name={person.name}
                    age={person.age}
                    click={props.clicked.bind(this, index)}
                    changed={(event) => props.changed(event, person.id)} />
            );
    }
}

export default Persons;