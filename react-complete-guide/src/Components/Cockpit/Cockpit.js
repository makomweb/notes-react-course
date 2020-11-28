import React, { useEffect, useRef } from 'react';
import styles from './Cockpit.css';

const Cockpit = (props) => {
    const toggleButtonRef = useRef(null);

    useEffect(() => {
        console.log('[Cockpit.js] useEffect()')
        // Todo issue a side effect call!
        toggleButtonRef.current.click();
        /*
        const timer = setTimeout(() => alert('Saved data to cloud!'), 500);
        return () => {
            clearTimeout(timer);
            console.log('[Cockpit.js] cleanup work in useEffect()')
        }
        */
    }, []); // empty array means this effect is only called once!

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
            <button
                ref={toggleButtonRef}
                className={buttonClass}
                onClick={props.clicked}>Toggle persons</button>
            <button onClick={props.login}>Log in</button>
        </div>
    );
}

export default React.memo(Cockpit);