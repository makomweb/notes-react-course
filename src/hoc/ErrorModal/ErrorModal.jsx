import React from 'react';
import styles from './ErrorModal.css';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary/Auxiliary';

const showErrorModal = (WrappedComponent) => {
    return (props) => {
        return (
            <Aux>
                <Modal>
                    Something didn't work!
                </Modal>
                <WrappedComponent {...props} />
            </Aux>
        );
    }
};

export default showErrorModal;