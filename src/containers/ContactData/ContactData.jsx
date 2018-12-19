import React, { Component } from 'react';
import Button from '../../components/UI/Button/Button';
import styles from './ContactData.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import AxiosInstance from '../../AxiosInstance';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: '',
            town: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'DJ Emkay',
                address: {
                    town: 'Smalltown UK',
                    street: 'Bakerstreet 32',
                    country: 'UK'
                }
            },
            email: 'emaky@test.org',
            deliveryMethod: 'fastest'
        };

        this.setState({ loading: true });

        AxiosInstance.post('orders.json', order)
            .then(_ => {
                this.setState({ loading: false });
            })
            .catch(_ => {
                this.setState({ loading: false });
            });

    }

    render() {
        let form = (
            <form>
                <input className={styles.Input} type="text" name="name" placeholder="Enter your name" />
                <input className={styles.Input} type="text" name="email" placeholder="Enter your email" />
                <input className={styles.Input} type="text" name="street" placeholder="Enter your street" />
                <input className={styles.Input} type="text" name="postal" placeholder="Enter your postal code" />
                <input className={styles.Input} type="text" name="town" placeholder="Enter your town" />
                <Button buttonType="Success" clicked={this.orderHandler} >OK</Button>
            </form>
        );

        if (this.state.loading) {
            form = <Spinner />;
        }

        return (
            <div className={styles.ContactData}>
                <h4>Enter your contact data:</h4>
                {form}
            </div>);
    }
}

export default ContactData;