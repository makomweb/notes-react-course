import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person.js';

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
    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    };

    let persons = null;
    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons
            .map((p, index) =>
              <Person
                key={p.id}
                name={p.name}
                age={p.age}
                click={this.deletePersonHandler.bind(this, index)}
                changed={(event) => this.nameChangedHandler(event, p.id)} />
            )}
        </div>
      );

      style.backgroundColor = 'red';
    }

    let classes = ['red', 'bold'].join(' ');
    
    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p className={classes}>This is really working!</p>
        <button
          style={style}
          onClick={this.togglePersonsHandler}>Switch Name</button>
        {persons}
      </div>
    );
  }
}

export default App;
