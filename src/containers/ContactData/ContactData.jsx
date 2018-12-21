import React, { Component } from 'react';
import Button from '../../components/UI/Button/Button';
import styles from './ContactData.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import AxiosInstance from '../../AxiosInstance';
import Input from '../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text', // default HTML attribute names!
                    placeholder: 'Your name'
                },
                value: ''
            },
            town: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your ZIP'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your street'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your country'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { id: 'fastest', displayName: 'Fastest' },
                        { id: 'cheepest', displayName: 'Cheepest' }
                    ],
                    placeholder: 'Delivery method'
                },
                value: null
            }
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
                this.props.history.push("/");
            })
            .catch(_ => {
                this.setState({ loading: false });
                this.props.history.push("/");
            });
    }

    render() {
        const formElements = [];

        for (let key in this.state.orderForm) {
            formElements.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (
            <form>
                {formElements.map(elem => (
                    <Input
                        key={elem.id}
                        elementType={elem.config.elementType}
                        elementConfig={elem.config.elementConfig}
                        value={elem.config.value} />
                ))}
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