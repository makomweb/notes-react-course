import React, { useEffect } from 'react';
import styles from './Cockpit.css';

const Cockpit = (props) => {
    useEffect(() => {
        console.log('[Cockpit.js] useEffect()')
        // Todo issue a side effect call!
        const timer = setTimeout(() => alert('Saved data to cloud!'), 500);
        return () => {
            clearTimeout(timer);
            console.log('[Cockpit.js] cleanup work in useEffect()')
        }
    }, []);

    const { personsLength, showPersons, title } = props;
    const buttonClass = showPersons ?
        styles.Red : '';

    const assignedClasses = [];
    if (personsLength <= 2) {
        assignedClasses.push(styles.red);
    }
    if (personsLength <= 1) {
        assignedClasses.push(styles.bold);
    }

    return (
        <div className={styles.Cockpit}>
            <h1>{title}</h1>
            <p className={assignedClasses.join(' ')}>This is really working!</p>
            <button className={buttonClass}
                onClick={props.clicked}>Toggle persons</button>
        </div>
    );
}

export default React.memo(Cockpit);