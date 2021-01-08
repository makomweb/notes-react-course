import React from 'react';
import Modal from '../../Components/UI/Modal/Modal.js'
import Aux from '../Auxiliary/Auxiliary.js';
import { useHttpErrorHandler } from '../../Hooks/HttpErrorHandler';

const ErrorModal = (WrappedComponent, AxiosInstance) => {
    return props => {
        const [error, clearError] = useHttpErrorHandler(AxiosInstance);
        return (
            <Aux>
                <Modal show={error}
                    tapped={clearError}>
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </Aux>
        );
    }
}

export default ErrorModal;