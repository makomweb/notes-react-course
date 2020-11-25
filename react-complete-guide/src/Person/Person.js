import React from 'react';

const Person = (props) => {
    const { age, name } = props;
    return (
        <div onClick={props.click}>
            <p>I'm a {name} an I am {age} years old.</p>
            <p>{props.children}</p>
            <input type="text" onChange={props.changed} />
        </div>
    );
}

export default Person;