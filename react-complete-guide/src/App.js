import React, { useState } from 'react';
import './App.css';
import Person from './Person/Person.js';

const App = props => {
  const [personsState, setPersonsState] = useState({
    persons: [
      { name: 'Peter', age: 19 },
      { name: 'Paul', age: 20 },
      { name: 'Mary', age: 21 }
    ],
    otherState: 'some other value'
  });

  const switchNameHandler = () => {
    //console.log('was clicked');
    // DONT DO THIS!!!personsState.persons[0].name = 'Martin';
    setPersonsState({
      persons: [
        { name: 'Peter', age: 22 },
        { name: 'Paul', age: 20 },
        { name: 'Martin', age: 21 }
      ]
    });
  }

  return (
    <div className="App">
      <h1>Hi, I'm a React App</h1>
      <p>This is really working!</p>
      <button onClick={switchNameHandler}>Switch Name</button>
      <Person name={personsState.persons[0].name} age={personsState.persons[0].age} />
      <Person name={personsState.persons[1].name} age={personsState.persons[1].age} >My hobbies: parachute</Person>
      <Person name={personsState.persons[2].name} age={personsState.persons[2].age} />
    </div>
  );
}

export default App;
