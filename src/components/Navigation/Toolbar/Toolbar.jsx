import React from 'react';
import styles from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Hamburger from '../../SideDrawer/Hamburger/Hamburger';

const toolbar = (props) => (
    <header className={styles.Toolbar}>
        <Hamburger clicked={props.openSideDrawer} className={styles.MenuButton} />
        <div className={styles.Logo}>
            <Logo />
        </div>
        <nav className={styles.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
);

export default toolbar;