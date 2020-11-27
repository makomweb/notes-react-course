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
    showPersons: false,
    showCockpit: true
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

  constructor(props) {
    super(props);
    console.log('[App.js] constructor()');
  }
  static getDerivedStateFromProps(props, state) {
    console.log('[App.js] getDerivedStateFromProps()');
    return state;
  }

  // componentWillMount() {
  //   console.log('[App.js] componentWillMount()');
  // }

  componentDidMount() {
    console.log('[App.js] componentDidMount()');
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('[App.js] getSnapshotBeforeUpdate()');
    return prevState;
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('[App.js] shouldComponentUpdate()');
    return true;
  }

  componentDidUpdate() {
    console.log('[App.js] componentDidUpdate()');
  }

  render() {
    console.log('[App.js] render()');
    const { showPersons, persons } = this.state;

    let personsComponent = showPersons ?
      <Persons
        persons={persons}
        clicked={this.deletePersonHandler}
        changed={this.nameChangedHandler} /> : null;

    return (
      <div className={classes.App}>
        <button onClick={
          () => this.setState({ showCockpit: !this.state.showCockpit })
        }
        >Toggle cockpit</button>
        {this.state.showCockpit ? <Cockpit
          title={this.props.appTitle}
          showPersons={showPersons}
          personsLength={persons.length}
          clicked={this.togglePersonsHandler} /> : null}
        {personsComponent}
      </div>
    );
  }
}

export default App;
