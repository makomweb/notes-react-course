import React, { PureComponent } from 'react';
import Person from './Person/Person.js'

class Persons extends PureComponent {
    state = {};
    constructor(props) {
        super(props);
        console.log('[Persons.js] constructor()');
    }
    static getDerivedStateFromProps(props, state) {
        console.log('[Persons.js] getDerivedStateFromProps()');
        return state;
    }

    // componentWillMount() {
    //     console.log('[Persons.js] componentWillMount()');
    // }

    componentDidMount() {
        console.log('[Persons.js] componentDidMount()');
    }

    componentWillUnmount() {
        console.log('[Persons.js] componentWillUnmount()');
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('[Persons.js] getSnapshotBeforeUpdate()');
        return { message: 'Payload!' };
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log('[Persons.js] shouldComponentUpdate()');

    //     return (
    //         nextProps.persons !== this.props.persons ||
    //         nextProps.changed !== this.props.changed ||
    //         nextProps.clicked !== this.props.clicked
    //     );
    // }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('[Persons.js] componentDidUpdate()');
        console.log(snapshot);
    }

    render() {
        console.log('[Persons.js] render()');
        const { persons, clicked, changed } = this.props;
        return persons
            .map((person, index) =>
                <Person
                    key={person.id}
                    name={person.name}
                    age={person.age}
                    click={clicked.bind(this, index)}
                    changed={(event) => changed(event, person.id)} />
            );
    }
}

export default Persons;