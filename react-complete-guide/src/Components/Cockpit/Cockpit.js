import React from 'react';
import styles from './Cockpit.css';

const Cockpit = (props) => {
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
            <h1>Hi, I'm a React App</h1>
            <p className={assignedClasses.join(' ')}>This is really working!</p>
            <button className={buttonClass}
                onClick={props.clicked}>Toggle persons</button>
        </div>
    );
}

export default Cockpit;