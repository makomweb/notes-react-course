import React from 'react';
import './Person.css';

const Person = (props) => {

    const rnd = Math.random();
    if (rnd > 0.7) {
        throw new Error('Something went wrong!')
    }

    const { age, name } = props;
    return (
        <div className="Person" >
            <p onClick={props.click}>I'm a {name} an I am {age} years old.</p>
            <p>{props.children}</p>
            <input type="text" onChange={props.changed} value={props.name} />
        </div>
    );
}

export default Person;