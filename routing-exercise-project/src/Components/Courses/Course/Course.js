import React from 'react';
import './Course.css';

const course = props => {
    console.log(props);
    const { id } = props.match.params;
    const { title } = props.history.location.query;
    return (
        <div className="my-course" >
            <p>{id}:{title}</p>
        </div>
    );
}

export default course;