import React, { Component } from 'react';
import Button from '../../../Components/UI/Button/Button.js';
import classes from './ContactData.css';
import AxiosInstance from '../../../AxiosInstance.js';
import Spinner from '../../../Components/UI/Spinner/Spinner.js';
import Input from '../../../Components/UI/Input/Input.js';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                type: 'input',
                config: {
                    type: 'text',
                    placeholder: 'Your name'
                },
                value: ''
            },
            stree: {
                type: 'input',
                config: {
                    type: 'text',
                    placeholder: 'Your street'
                },
                value: ''
            },
            zipCode: {
                type: 'input',
                config: {
                    type: 'text',
                    placeholder: 'ZIP code'
                },
                value: ''
            },
            country: {
                type: 'input',
                config: {
                    type: 'text',
                    placeholder: 'Your country'
                },
                value: ''
            },
            email: {
                type: 'input',
                config: {
                    type: 'email',
                    placeholder: 'Your email'
                },
                value: ''
            },
            deliveryMethod: {
                type: 'select',
                config: {
                    options: [
                        { value: 'fast', displayValue: 'Fast' },
                        { value: 'cheapest', displayValue: 'Cheapest' },
                    ]
                },
                value: ''
            },
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

    onInputChanged = event => {
        console.log(event.target.value);
    }

    render() {
        const formElements = [];
        for (let key in this.state.orderForm) {
            formElements.push({
                id: key,
                data: this.state.orderForm[key],
            });
        }

        let form = (
            <form>
                {formElements.map(elem => (
                    <Input
                        key={elem.id}
                        type={elem.data.type}
                        config={elem.data.config}
                        value={elem.data.value}
                        changed={this.onInputChanged} />
                ))}
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