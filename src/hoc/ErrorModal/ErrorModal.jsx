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
            });

            axiosInstance.interceptors.response.use(null, error => {
                this.setState({ error: error });
            });
        }
        
        render() {
            return (
                <Aux>
                    <Modal show={this.state.error}>
                        {this.state.error.message}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    };
}

export default showErrorModal;