import React, { Component } from 'react';
import styles from './Orders.css';
import Order from '../../components/Order/Order';
import AxiosInstance from '../../AxiosInstance';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorModal from '../../hoc/WithErrorModal/WithErrorModal';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        AxiosInstance.get('orders.json')
            .then(response => {
                // TURN object
                // {"-LU5MJeHRdaQwZUb_EIi":{"customer":{"address":{"country":"UK","street":"Bakerstreet 32",
                // "town":"Smalltown UK"},"name":"DJ Emkay"},"deliveryMethod":"fastest","email":"emaky@test.org",
                // "ingredients":{"bacon":0,"cheese":2,"lettuce":0,"patty":2},"price":"6.8999999999999995"},
                // "-LU5MLxBIe2mryYCUwQ_":{"customer":{"address":{"country":"UK","street":"Bakerstreet 32",
                // "town":"Smalltown UK"},"name":"DJ Emkay"},"deliveryMethod":"fastest","email":"emaky@test.org",
                // "ingredients":{"bacon":1,"cheese":1,"lettuce":0,"patty":1},"price":"5.9"}}
                // INTO an ARRAY of ORDER components
                const orders = [];
                for (let key in response.data) {
                    orders.push({
                        id: key,
                        ...response.data[key]
                    });
                }
                this.setState({ orders: orders, loading: false });
            })
            .catch(error => {
                console.log(error);
                this.setState({ loading: false });
            });
    }

    render() {
        let content = null;

        if (this.state.loading) {
            content = <Spinner />;
        } else {
            content = this.state.orders.map(order => {
                return (
                    <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price}
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

export default WithErrorModal(Orders, AxiosInstance);