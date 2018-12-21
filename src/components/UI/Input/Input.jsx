import React, { Component } from 'react';
import styles from './Input.css';

const input = (props) => {
    let inputElement = null;

    switch (props.elementtype) {
        case ('textarea'):
            inputElement = <textarea className={styles.Label} {...props} />;
            break;
        default:
        case ('input'):
            inputElement = <input className={styles.InputElement} {...props} />
            break;
    }

    return (
        <div className={styles.Input}>
            <label>{props.label}</label>
            {inputElement}
        </div>
    );
}

export default input;