import React, { useEffect } from 'react';
import styles from './Cockpit.css';

const Cockpit = (props) => {
    useEffect(() => {
        console.log('[Cockpit.js] useEffect()')
        // Todo issue a side effect call!
        setTimeout(
            () => alert('Saved data to cloud!'), 500
        );
    });

    const { persons, showPersons } = props;
    const buttonClass = showPersons ?
        styles.Red : '';

    const assignedClasses = [];
    if (persons.length <= 2) {
        assignedClasses.push(styles.red);
    }
    if (persons.length <= 1) {
        assignedClasses.push(styles.bold);
    }

    return (
        <div className={styles.Cockpit}>
            <h1>{props.title}</h1>
            <p className={assignedClasses.join(' ')}>This is really working!</p>
            <button className={buttonClass}
                onClick={props.clicked}>Toggle persons</button>
        </div>
    );
}

export default Cockpit;