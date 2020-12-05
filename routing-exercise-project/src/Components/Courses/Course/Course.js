import React from 'react';
import './Course.css';

const course = (props) => {
    const { id, title, tapped } = props;
    return (
        <div className="my-course" >
            <p>Course details come here!</p>
        </div>
    );
}

export default course;