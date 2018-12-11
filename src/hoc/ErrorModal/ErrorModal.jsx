import React, { Component } from 'react';
import styles from './ErrorModal.css';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary/Auxiliary';

const showErrorModal = (WrappedComponent, axiosInstance) => {
    return class extends Component {
        state = {
            error: null
        }

        componentWillMount() {
            console.log('[ErrorModal] componentWillMount()');
            this.requestInterceptor = axiosInstance.interceptors.request.use(request => {
                this.setState({ error: null });
                return request;
            });

            this.responseInterceptor = axiosInstance.interceptors.response.use(response => response, error => {
                this.setState({ error: error });
            });
        }

        errorConfirmedHandler = () => {
            this.setState({ error: null });
        }

        componentWillUnmount() {
            console.log('[ErrorModal] componentWillUnmount()', this.requestInterceptor, this.responseInterceptor);
            axiosInstance.interceptors.request.eject(this.requestInterceptor);
            axiosInstance.interceptors.request.eject(this.responseInterceptor);
        }

        render() {
            return (
                <Aux>
                    <Modal
                        show={this.state.error}
                        tapped={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    };
}

export default showErrorModal;