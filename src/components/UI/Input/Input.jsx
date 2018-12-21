import React from 'react';
import styles from './Input.css';

const input = (props) => {
    let inputElement = null;
    const inputStyles = [styles.InputElement];
    if (props.touched && props.invalid && props.shouldValidate) {
        inputStyles.push(styles.Invalid);
    }

    let validationError = null;
    if (props.touched && props.invalid) {
        validationError = <p className={styles.ValidationError}>{props.validationErrorMessage}</p>
    }

    switch (props.elementType) {
        case ('textarea'):
            inputElement = <textarea
                className={styles.Label}
                {...props.elementConfig}
                value={props.value} onChange={props.changed} />;
            break;
        case ('select'):
            inputElement = (
                <select
                    className={styles.InputElement}
                    {...props.elementConfig}
                    value={props.value} onChange={props.changed}>
                    {props.elementConfig.options.map(opt => (
                        <option
                            key={opt.id}
                            value={opt.id}>
                            {opt.displayName}
                        </option>
                    ))}
                    <option></option>
                </select>
            );
            break;

        default:
        case ('input'):
            inputElement = <input
                className={inputStyles.join(' ')}
                {...props.elementConfig}
                value={props.value} onChange={props.changed} />;
            break;
    }

    return (
        <div className={styles.Input}>
            <label>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    );
}

export default input;