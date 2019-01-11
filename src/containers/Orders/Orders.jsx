import React, { Component } from 'react';
import styles from './Orders.css';
import Order from '../../components/Order/Order';
import AxiosInstance from '../../AxiosInstance';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorModal from '../../hoc/WithErrorModal/WithErrorModal';
import * as actionCreators from '../../store/actions/index';
import { connect } from 'react-redux';

class Orders extends Component {
    componentDidMount() {
        this.props.onFetchOrders();
    }

    render() {
        const { orders, loading } = this.props;

        let content = null;

        if (loading) {
            content = <Spinner />;
        } else {
            content = orders.map(order => {
                return (
                    <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        price={+order.price}
                    />
                )
            });
        }

        return (
            <div>
                {content}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(actionCreators.createFetchOrdersAction())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorModal(Orders, AxiosInstance));