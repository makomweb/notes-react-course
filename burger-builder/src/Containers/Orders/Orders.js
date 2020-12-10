import React, { Component } from 'react';
import Order from '../../Components/Order/Order.js';
import AxiosInstance from '../../AxiosInstance.js';
import ErrorModal from '../../HOC/ErrorModal/ErrorModal.js';
import { connect } from 'react-redux';
import * as actions from '../../Store/Actions';

class Orders extends Component {

    componentDidMount = () => {
        this.props.fetchOrders();
    }

    render() {
        return (
            <div>
                {this.props.orders.map(o => {
                    return (
                        <Order key={o.id}
                            ingredients={o.ingredients}
                            price={o.price} />
                    );
                })}
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
        fetchOrders: () => dispatch(actions.fetchOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorModal(Orders, AxiosInstance));