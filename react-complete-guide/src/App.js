import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person.js';

class App extends Component {
  state = {
    persons: [
      { name: 'Peter', age: 19 },
      { name: 'Paul', age: 20 },
      { name: 'Mary', age: 21 }
    ],
    otherState: 'some other value',
    showPersons: false
  }

  nameChangedHandler = event => {
    this.setState({
      persons: [
        { name: 'Peter', age: 22 },
        { name: event.target.value, age: 20 },
        { name: 'Mary', age: 21 }
      ]
    });
  }

  togglePersonsHandler = () => {
    const { showPersons } = this.state;
    this.setState({ showPersons: !showPersons });
  }

  deletePersonHandler = () => {

  }

  render() {
    const style = {
      backgroundColor: 'white',
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
            .map(p =>
              <Person
                name={p.name}
                age={p.age}
                click={this.deletePersonHandler} />
            )}
        </div>
      );
    }

    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p>This is really working!</p>
        <button
          style={style}
          onClick={this.togglePersonsHandler}>Switch Name</button>
        {persons}
      </div>
    );
  }
}

export default App;
