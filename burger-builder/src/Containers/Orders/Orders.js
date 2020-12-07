import React, { Component } from 'react';
import Order from '../../Components/Order/Order.js';
import AxiosInstance from '../../AxiosInstance.js';
import ErrorModal from '../../HOC/ErrorModal/ErrorModal.js';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount = () => {
        AxiosInstance.get('/orders.json')
            .then(resp => {
                const fetchedOrders = [];
                for (let key in resp.data) {
                    fetchedOrders.push({
                        ...resp.data[key],
                        id: key
                    });
                }

                this.setState({ loading: false, orders: fetchedOrders });
            })
            .catch(err => {
                this.setState({ loading: false });
            });
    }

    render() {
        return (
            <div>
                {this.state.orders.map(o => {
                    return (
                        <Order key={o.id} />
                    );
                })}
            </div>
        );
    }
}

export default ErrorModal(Orders, AxiosInstance);