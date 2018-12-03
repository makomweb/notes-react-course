import React from 'react';
import Aux from '../../hoc/Auxiliary';
import styles from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';

const layout = (props) => {
    return (
        <Aux>
            <Toolbar></Toolbar>
            <div>SideDrawer</div>
            <main className={styles.Content}>
                {props.children}
            </main>
        </Aux>
    );
};

export default layout;