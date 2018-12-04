import React, { Component } from 'react';
import styles from './Modal.css';
import Aux from '../../../hoc/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show;
    }

    componentWillUpdate() {
        console.log("[Modal.js] componentWillUpdate()");
    }

    render() {
        return (
            <Aux>
                <Backdrop show={this.props.show} tapped={this.props.tapped} />
                <div style={{
                    transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: this.props.show ? '1' : '0'
                }}
                    className={styles.Modal}>
                    {this.props.children}
                </div>
            </Aux>);
    }
}

export default Modal;