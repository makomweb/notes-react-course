import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../store/actionTypes';

import Person from '../components/Person/Person';
import AddPerson from '../components/AddPerson/AddPerson';

class Persons extends Component {
    personAddedHandler = (name, age) => {
        const newPerson = {
            id: Math.random(), // not really unique but good enough here!
            name: name,
            age: age
        }

        this.props.onAdd(newPerson);
    }

    personDeletedHandler = (personId) => {
        this.props.onDelete(personId);
    }

    render() {
        return (
            <div>
                <AddPerson personAdded={this.personAddedHandler} />
                {this.props.persons.map(person => (
                    <Person
                        key={person.id}
                        name={person.name}
                        age={person.age}
                        clicked={() => this.personDeletedHandler(person.id)} />
                ))}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        persons: state.persons
    }
}

const mapActionsToDispatch = dispatch => {
    return {
        onAdd: (person) => dispatch({ type: actions.ADD_PERSON, payload: person }),
        onDelete: (id) => dispatch({ type: actions.DELETE_PERSON, payload: id })
    }
}

export default connect(mapStateToProps, mapActionsToDispatch)(Persons);