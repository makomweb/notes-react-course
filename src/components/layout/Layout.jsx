import React from 'react';
import Aux from '../../hoc/Auxiliary';
import styles from './Layout.css';

const layout = (props) => {
    return (
        <Aux>
            <div>Toolbar, SideDrawer, Backdrop, Hmm</div>
            <main className={styles.Content}>
                {props.children}
            </main>
        </Aux>
    );
};

export default layout;