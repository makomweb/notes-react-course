import React from 'react';
import './UserOutput.css'

const UserOutput = (props) => {
    return (
        <div className="wrapper">
            <div className="first"><p>Username:</p></div>
            <div className="second"><p>{props.username}</p></div>
        </div>
    );
}

export default UserOutput;