import React from 'react';

const UserInput = (props) => {
    const style = {
        padding: '16px'
    }

    return (
        <div style={style}>
            <input placeholder={props.value} onChange={props.userInput} value={props.value} />
        </div>
    );
}

export default UserInput;