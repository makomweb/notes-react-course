import React from 'react';
import styles from './Hamburger.css';

const hamburger = (props) => (
    <div className={styles.Hamburger} onClick={props.onClick}>MENU</div>
);

export default hamburger;