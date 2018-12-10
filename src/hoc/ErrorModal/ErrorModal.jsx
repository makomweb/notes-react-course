import React, { Component } from 'react';
import styles from './ErrorModal.css';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary/Auxiliary';

const showErrorModal = (WrappedComponent, axiosInstance) => {
    return class extends Component {
        state = {
            error: null
        }

        componentDidMount() {
            axiosInstance.interceptors.request.use(request => {
                this.setState({ error: null });
                return request;
            });

            axiosInstance.interceptors.response.use(response => response, error => {
                this.setState({ error: error });
            });
        }

        errorConfirmedHandler = () => {
            this.setState({ error: null });
        }

        render() {
            return (
                <Aux>
                    <Modal
                        show={this.state.error}
                        clicked={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    };
}

export default showErrorModal;