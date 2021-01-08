import React, { Component } from 'react';
import Auxiliary from '../Auxiliary/Auxiliary';
import SideDrawer from '../../Components/Navigation/SideDrawer/SideDrawer';
import Toolbar from '../../Components/Navigation/Toolbar/Toolbar.js';
import classes from './Layout.css';
import { connect } from 'react-redux';

class Layout extends Component {
    state = {
        sideDrawerVisible: false
    }

    onSideDrawerToggle = () => {
        this.setState((prevState) => {
            this.setState({ sideDrawerVisible: !prevState.sideDrawerVisible });
        });
    }

    render() {
        return (
            <Auxiliary>
                <Toolbar
                    toggleDrawer={this.onSideDrawerToggle}
                    isAuthenticated={this.props.isAuthenticated} />
                <SideDrawer open={this.state.sideDrawerVisible} closed={this.onSideDrawerToggle} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Auxiliary>
        );
    }
}
const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);