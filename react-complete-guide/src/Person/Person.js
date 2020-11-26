import React from 'react';
import './Person.css';
import Radium from 'radium';

const Person = (props) => {
    const style = {
        '@media (min-width: 500px)': {
            width: '450px'
        }
    }
    const { age, name } = props;
    return (
        <div className="Person" style={style} >
            <p onClick={props.click}>I'm a {name} an I am {age} years old.</p>
            <p>{props.children}</p>
            <input type="text" onChange={props.changed} value={props.name} />
        </div>
    );
}

export default Radium(Person);