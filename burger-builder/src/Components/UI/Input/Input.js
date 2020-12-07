import React from 'react';
import classes from './Input.css';

const Input = props => {
    let inputElement = null;
    switch (props.type) {
        case ('input'):
            inputElement = (
                <input className={classes.InputElement}
                    {...props.config}
                    value={props.value} />
            );
            break;
        case ('textarea'):
            inputElement = (
                <textarea className={classes.InputElement}
                    {...props.config}
                    value={props.value} />);
            break;
        case ('select'):
            inputElement = (
                <select className={classes.InputElement}
                    value={props.value} >
                    {props.config.options.map(opt => (
                        <option
                            key={opt.value}
                            value={opt.value}>
                            {opt.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = (
                <input className={classes.InputElement}
                    {...props.config}
                    value={props.value} />
            );
            break;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
}

export default Input;