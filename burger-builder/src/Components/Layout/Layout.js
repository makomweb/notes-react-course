import React from 'react';
import Auxiliary from '../../HOC/Auxiliary';
import Toolbar from '../Navigation/Toolbar/Toolbar.js';
import classes from './Layout.css';

const Layout = props => {
    return (
        <Auxiliary>
            <Toolbar />
            <div>
                Sidedrawer
            </div>
            <main className={classes.Content}>
                {props.children}
            </main>
        </Auxiliary>
    );
}

export default Layout;