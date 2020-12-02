import React from 'react';
import Modal from '../../Components/UI/Modal/Modal.js'
import Aux from '../Auxiliary/Auxiliary.js';

const ErrorModal = (WrappedComponent) => {
    return (props) => {
        return (
            <Aux>
                <Modal show>
                    Something didn't work!
                </Modal>
                <WrappedComponent {...props} />
            </Aux>
        );
    }
};

export default ErrorModal;