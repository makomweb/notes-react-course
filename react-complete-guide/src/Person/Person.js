import React from 'react';

const person = () => {
    const age = Math.floor(Math.random() * 30);
    return <p>I'm a person an I am {age} years old.</p>
}

export default person;