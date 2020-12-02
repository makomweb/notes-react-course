import React, { Component } from 'react';
import Modal from '../../Components/UI/Modal/Modal.js'
import Aux from '../Auxiliary/Auxiliary.js';
import AxiosInstance from '../../AxiosInstance.js';

const ErrorModal = (WrappedComponent, AxiosInstance) => {
    return class extends Component {
        state = {
            error: null
        }

        constructor() {
            super();
            this.reqInterceptor = AxiosInstance.interceptors.request.use(req => {
                this.setState({ error: null });
                return req;
            });
            this.resInterceptor = AxiosInstance.interceptors.response.use(res => res, error => {
                this.setState({ error: error });
            });
        }

        componentWillUnmount() {
            AxiosInstance.interceptors.request.eject(this.reqInterceptor);
            AxiosInstance.interceptors.response.eject(this.resInterceptor);
        }

        onErrorModalClicked = () => {
            this.setState({ error: null });
        }

        render() {
            return (
                <Aux>
                    <Modal show={this.state.error}
                        tapped={this.onErrorModalClicked}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
}

export default ErrorModal;