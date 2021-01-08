import React from 'react';
import Auxiliary from '../../../HOC/Auxiliary/Auxiliary.js';
import Backdrop from '../Backdrop/Backdrop.js';
import classes from './Modal.css';

// const shouldComponentUpdate = (currentProps, nextProps) => {
//     return nextProps.show !== currentProps.show ||
//         nextProps.children !== currentProps.children;
// }

const Modal = (props) => {
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

export default React.memo(Modal);