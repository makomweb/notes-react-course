import React from 'react';

const Validate = (props) => {
    const { textLength } = props;
    return textLength >= 5 ? <div><p>Text long enough</p></div> : <div><p>Text too short</p></div>;
}

export default Validate;