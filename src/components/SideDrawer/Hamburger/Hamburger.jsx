import React from 'react';
import styles from './Hamburger.css';

const hamburger = (props) => (
    <div className={styles.Hamburger} onClick={props.clicked}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default hamburger;