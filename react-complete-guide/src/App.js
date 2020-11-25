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
    otherState: 'some other value'
  }

  switchNameHandler = (newName) => {
    this.setState({
      persons: [
        { name: 'Peter', age: 22 },
        { name: 'Paul', age: 20 },
        { name: newName, age: 21 }
      ]
    });
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

  render() {
    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p>This is really working!</p>
        <button onClick={this.switchNameHandler.bind(this, 'Martin')}>Switch Name</button>
        <Person
          name={this.state.persons[0].name}
          age={this.state.persons[0].age} />
        <Person
          name={this.state.persons[1].name}
          age={this.state.persons[1].age}
          click={() => this.switchNameHandler('Arnold')}
          changed={this.nameChangedHandler} >My hobbies: parachute</Person>
        <Person
          name={this.state.persons[2].name}
          age={this.state.persons[2].age} />
      </div>
    );
  }
}

export default App;
