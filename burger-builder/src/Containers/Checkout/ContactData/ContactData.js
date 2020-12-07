import React, { Component } from 'react';
import Button from '../../../Components/UI/Button/Button.js';
import classes from './ContactData.css';
import AxiosInstance from '../../../AxiosInstance.js';
import Spinner from '../../../Components/UI/Spinner/Spinner.js';
import Input from '../../../Components/UI/Input/Input.js';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    onOrderTapped = event => {
        event.preventDefault();
        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Mary',
                address: {
                    street: 'Teststreet 1',
                    zipCode: '43215',
                    country: 'Germany'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fast'
        }

        AxiosInstance.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ loading: false });
            });
    }

    render() {

        let form = (
            <form>
                <Input inputType="input" type="text" name="name" placeholder="Your name" />
                <Input inputType="input" type="email" name="email" placeholder="Your email" />
                <Input inputType="input" type="text" name="street" placeholder="Your street" />
                <Input inputType="input" type="text" name="postal" placeholder="Your postal code" />
                <Button buttonType="Success"
                    clicked={this.onOrderTapped}>ORDER</Button>
            </form>
        );

        if (this.state.loading) {
            form = <Spinner />
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data:</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;