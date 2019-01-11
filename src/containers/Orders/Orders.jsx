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

        if (loading) {
            return <Spinner />;
        } else {
            return (
                <div>
                    {orders.map(o =>
                        <Order
                            key={o.id}
                            ingredients={o.ingredients}
                            price={+o.price} />
                    )}
                </div>);
        }
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