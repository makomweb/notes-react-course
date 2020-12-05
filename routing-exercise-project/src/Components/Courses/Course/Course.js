import React from 'react';
import './Course.css';

const course = props => {
    const { id } = props.match.params;
    return (
        <div className="my-course" >
            <p>ID: {id}</p>
        </div>
    );
}

export default course;