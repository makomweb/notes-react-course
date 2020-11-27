import React, { Component } from 'react';
import classes from './App.css';
import Persons from '../Components/Persons/Persons.js';
import Cockpit from '../Components/Cockpit/Cockpit';

class App extends Component {
  state = {
    persons: [
      { id: 1, name: 'Peter', age: 19 },
      { id: 2, name: 'Paul', age: 20 },
      { id: 3, name: 'Mary', age: 21 }
    ],
    otherState: 'some other value',
    showPersons: false
  }

  nameChangedHandler = (event, personId) => {

    const personIndex = this.state.persons.findIndex(p => p.id === personId);

    // Don't mutate the original object, but make a copy with the Spread operator.
    const person = { ...this.state.persons[personIndex] };
    // alternatively: const person = Object.assign({}, this.state.persons[personIndex]);

    person.name = event.target.value;
    const persons = [...this.state.persons];
    // alternatively: const persons = this.state.persons.splice();
    persons[personIndex] = person;
    this.setState({ persons: persons });
  }

  togglePersonsHandler = () => {
    const { showPersons } = this.state;
    this.setState({ showPersons: !showPersons });
  }

  deletePersonHandler = personIndex => {
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons: persons });
  }

  render() {
    const { showPersons, persons } = this.state;

    let personsComponent = showPersons ?
      <Persons
        persons={persons}
        clicked={this.deletePersonHandler}
        changed={this.nameChangedHandler} /> : null;

    return (
      <div className={classes.App}>
        <Cockpit
          title={this.props.appTitle}
          showPersons={showPersons}
          persons={persons}
          clicked={this.togglePersonsHandler} />
        {personsComponent}
      </div>
    );
  }
}

export default App;
