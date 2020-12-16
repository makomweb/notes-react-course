import React, { Component } from 'react';
import Order from '../../Components/Order/Order.js';
import AxiosInstance from '../../AxiosInstance.js';
import ErrorModal from '../../HOC/ErrorModal/ErrorModal.js';
import { connect } from 'react-redux';
import * as actions from '../../Store/Actions';
import Spinner from '../../Components/UI/Spinner/Spinner';

class Orders extends Component {

    componentDidMount = () => {
        const { token, userId } = this.props;
        this.props.fetchOrders(token, userId);
    }

    render() {
        return this.props.loading ? <Spinner /> :
            <div>
                {this.props.orders.map(o =>
                    <Order key={o.id}
                        ingredients={o.ingredients}
                        price={o.price} />
                )}
            </div>
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorModal(Orders, AxiosInstance));