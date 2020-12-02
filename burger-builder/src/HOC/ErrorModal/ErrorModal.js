import React, { Component } from 'react';
import Modal from '../../Components/UI/Modal/Modal.js'
import Aux from '../Auxiliary/Auxiliary.js';
import AxiosOrders from '../../AxiosOrders.js';

const ErrorModal = (WrappedComponent, AxiosOrders) => {
    return class extends Component {
        state = {
            error: null
        }

        componentWillMount() {
            this.reqInterceptor = AxiosOrders.interceptors.request.use(req => {
                this.setState({ error: null });
                return req;
            });
            this.resInterceptor = AxiosOrders.interceptors.response.use(res => res, error => {
                this.setState({ error: error });
            });
        }

        componentWillUnmount() {
            AxiosOrders.interceptors.request.eject(this.reqInterceptor);
            AxiosOrders.interceptors.response.eject(this.resInterceptor);
        }

        render() {
            return (
                <Aux>
                    <Modal show={this.state.error}>
                        {this.state.error}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
}

export default ErrorModal;