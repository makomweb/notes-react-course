import React, { Component } from 'react';
import styles from './ErrorModal.css';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary/Auxiliary';

const showErrorModal = (WrappedComponent) => {
    return class extends Component {
        render() {
            return (
                <Aux>
                    <Modal show>
                        Something didn't work!
                </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    };
}

export default showErrorModal;