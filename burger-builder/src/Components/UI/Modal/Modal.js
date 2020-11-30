import React, { Component } from 'react';
import Auxiliary from '../../../HOC/Auxiliary.js';
import Backdrop from '../Backdrop/Backdrop.js';
import classes from './Modal.css';

class Modal extends Component {
    componentDidUpdate = () => {
        console.log('[Modal.js] componentDidUpdate();')
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show;
    }

    render() {
        const { props } = this;
        return (
            <Auxiliary>
                <Backdrop show={props.show} tapped={props.tapped} />
                <div
                    className={classes.Modal}
                    style={{
                        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: props.show ? '1' : '0'
                    }}>
                    {props.children}
                </div>
            </Auxiliary>
        );
    }
}

export default Modal;