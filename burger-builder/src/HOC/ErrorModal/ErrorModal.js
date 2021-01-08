import React, { useCallback, useEffect, useState } from 'react';
import Modal from '../../Components/UI/Modal/Modal.js'
import Aux from '../Auxiliary/Auxiliary.js';

const ErrorModal = (WrappedComponent, AxiosInstance) => {
    return props => {
        const [error, setError] = useState(null);

        const reqInterceptor = AxiosInstance.interceptors.request.use(req => {
            setError(null);
            return req;
        });

        const resInterceptor = AxiosInstance.interceptors.response.use(res => res, err => {
            setError(err);
        });

        useEffect(() => {
            return () => {
                AxiosInstance.interceptors.request.eject(reqInterceptor);
                AxiosInstance.interceptors.response.eject(resInterceptor);
            };
        }, [reqInterceptor, resInterceptor]);

        const onErrorModalClicked = useCallback(() => {
            setError(null);
        }, []);

        return (
            <Aux>
                <Modal show={error}
                    tapped={onErrorModalClicked}>
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </Aux>
        );
    }
}

export default ErrorModal;