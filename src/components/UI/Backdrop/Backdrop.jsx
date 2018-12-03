import React from 'react';
import styles from './Backdrop.css';

const backdrop = (props) => (
    props.show ? <div className={styles.Backdrop} onClick={props.tapped}></div> : null
);

export default backdrop;