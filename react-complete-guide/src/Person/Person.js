import React from 'react';

const person = (props) => {
    const { age, name } = props;
    return (
        <div>
            <p>I'm a {name} an I am {age} years old.</p>
            <p>{props.children}</p>
        </div>
    );
}

export default person;