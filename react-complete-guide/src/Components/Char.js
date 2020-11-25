import React from 'react';
import './Char.css';

const Char = (props) => {
    return (
        <div className="CharBlock" onClick={props.deleted}>
            {props.value}
        </div>
    );
}

export default Char;