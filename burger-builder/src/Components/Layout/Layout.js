import React from 'react';
import Auxiliary from '../../HOC/Auxiliary';
import classes from './Layout.css';

const Layout = props => {
    return (
        <Auxiliary>
            <div>
                Toobar, Sidedrawer, Backdrop
            </div>
            <main className={classes.Content}>
                {props.children}
            </main>
        </Auxiliary>
    );
}

export default Layout;