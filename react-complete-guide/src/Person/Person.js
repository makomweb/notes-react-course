import React from 'react';
import './Person.css';

const Person = (props) => {
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