import React, { Component } from 'react';
import classes from './Person.css';

class Person extends Component {
    render() {
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