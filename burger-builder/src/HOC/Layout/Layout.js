import React, { useCallback, useState } from 'react';
import Auxiliary from '../Auxiliary/Auxiliary';
import SideDrawer from '../../Components/Navigation/SideDrawer/SideDrawer';
import Toolbar from '../../Components/Navigation/Toolbar/Toolbar.js';
import classes from './Layout.css';
import { connect } from 'react-redux';

const Layout = props => {
    const [sideDrawerVisible, setSideDrawerVisible] = useState(false);

    const onSideDrawerToggle = useCallback(() => {
        setSideDrawerVisible(prevState => !prevState);
    }, []);

    return (
        <Auxiliary>
            <Toolbar
                toggleDrawer={onSideDrawerToggle}
                isAuthenticated={props.isAuthenticated} />
            <SideDrawer open={sideDrawerVisible} closed={onSideDrawerToggle} />
            <main className={classes.Content}>
                {props.children}
            </main>
        </Auxiliary>
    );
}


const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);