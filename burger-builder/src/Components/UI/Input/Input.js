import React from 'react';
import classes from './Input.css';

const Input = props => {
    let inputElement = null;
    const inputClasses = [classes.InputElement];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    switch (props.type) {
        case ('input'):
            inputElement = (
                <input className={inputClasses.join(' ')}
                    {...props.config}
                    value={props.value} onChange={props.changed} />
            );
            break;
        case ('textarea'):
            inputElement = (
                <textarea className={inputClasses.join(' ')}
                    {...props.config}
                    value={props.value} onChange={props.changed} />);
            break;
        case ('select'):
            inputElement = (
                <select className={inputClasses.join(' ')}
                    value={props.value} onChange={props.changed} >
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
                <input className={inputClasses.join(' ')}
                    {...props.config}
                    value={props.value} onChange={props.changed} />
            );
            break;
    }

    let validationError = null;
    if (props.invalid && props.touched) {
        validationError = <p className={classes.ValidationError}>{props.errorMessage}</p>;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    );
}

export default Input;