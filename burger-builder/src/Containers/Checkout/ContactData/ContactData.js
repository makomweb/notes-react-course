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
                value: '',
                validation: {
                    required: true,
                    errorMessage: 'Please enter a valid name!'
                },
                valid: false,
                touched: false
            },
            street: {
                type: 'input',
                config: {
                    type: 'text',
                    placeholder: 'Your street',
                    errorMessage: 'Please enter a valid street!'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                type: 'input',
                config: {
                    type: 'text',
                    placeholder: 'ZIP code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                    errorMessage: 'Please enter a valid ZIP code!'
                },
                valid: false,
                touched: false
            },
            country: {
                type: 'input',
                config: {
                    type: 'text',
                    placeholder: 'Your country'
                },
                value: '',
                validation: {
                    required: true,
                    errorMessage: 'Please enter a valid country!'
                },
                valid: false,
                touched: false
            },
            email: {
                type: 'input',
                config: {
                    type: 'email',
                    placeholder: 'Your email'
                },
                value: '',
                validation: {
                    required: true,
                    errorMessage: 'Please enter a valid email address!'
                },
                valid: false,
                touched: false
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

        const formData = {};
        for (let key in this.state.orderForm) {
            formData[key] = this.state.orderForm[key].value;
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: formData
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

    onInputChanged = (event, inputId) => {
        const updatedForm = {
            ...this.state.orderForm
        };

        const updatedFormElement = {
            ...updatedForm[inputId]
        };

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid =
            this.isValid(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;

        updatedForm[inputId] = updatedFormElement;

        this.setState({ orderForm: updatedForm });
    }

    isValid(value, rules) {
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
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
            <form onSubmit={this.onOrderTapped}>
                {formElements.map(elem => (
                    <Input
                        key={elem.id}
                        type={elem.data.type}
                        config={elem.data.config}
                        value={elem.data.value}
                        invalid={!elem.data.valid}
                        errorMessage={elem.data.validation ? elem.data.validation.errorMessage : null}
                        shouldValidate={elem.data.validation}
                        touched={elem.data.touched}
                        changed={(event) => this.onInputChanged(event, elem.id)} />
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