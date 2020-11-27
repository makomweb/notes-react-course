import React from 'react';
import styles from './Cockpit.css';

const Cockpit = (props) => {
    const { persons } = props;
    let buttonClass = '';
    if (props.showPersons) {
        buttonClass = styles.Red;
    }

    let assignedClasses = [];
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