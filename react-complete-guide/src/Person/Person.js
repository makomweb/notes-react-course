import React from 'react';

const person = (props) => {
    const { age, name } = props;
    return <p>I'm a {name} an I am {age} years old.</p>
}

export default person;