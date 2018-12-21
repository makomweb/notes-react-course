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
                value: '',
                valueType: 'name',
                validationRules: {
                    required: true,
                    minLength: 8,
                    maxLength: 24,
                    errorMessage: 'The name should be between 8 and 24 characters long!'
                },
                valid: false,
                touched: false
            },
            town: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validationRules: {
                    required: true,
                    minLength: 8,
                    maxLength: 24,
                    errorMessage: 'Please enter a valid street!'
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your ZIP'
                },
                value: '',
                validationRules: {
                    required: true,
                    minLength: 8,
                    maxLength: 24,
                    errorMessage: 'Please enter a valid ZIP code!'
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your town'
                },
                value: '',
                validationRules: {
                    required: true,
                    minLength: 8,
                    maxLength: 24,
                    errorMessage: 'Please enter a valid town!'
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your country'
                },
                value: '',
                validationRules: {
                    required: true,
                    minLength: 8,
                    maxLength: 24,
                    errorMessage: 'Please enter a valid country!'
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email'
                },
                value: '',
                validationRules: {
                    required: true,
                    minLength: 8,
                    maxLength: 24,
                    errorMessage: 'Please enter a valid email address!'
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { id: 'fastest', displayName: 'Fastest' },
                        { id: 'cheapest', displayName: 'Cheapest' }
                    ],
                    placeholder: 'Delivery method'
                },
                value: '',
                validationRules: {
                    required: true,
                    errorMessage: 'Please select a delivery method!'
                },
            }
        },
        formIsValid: false,
        loading: false
    }

    checkValidity(value, rules) {
        if (!rules) {
            return true;
        }

        if (rules.required && value.trim() === '') {
            return false;
        }

        if (rules.minLength && value.length < rules.minLength) {
            return false;
        }

        if (rules.maxLength && value.length > rules.maxLength) {
            return false;
        }

        return true;
    }

    orderHandler = (event) => {
        event.preventDefault();

        const formData = {};

        for (let elementId in this.state.orderForm) {
            formData[elementId] = this.state.orderForm[elementId].value;
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
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

    onInputChanged = (event, inputIdentifier) => {
        const formData = {
            ...this.state.orderForm
        };

        const formDataElement = {
            ...formData[inputIdentifier]
        }

        const { value } = event.target;
        formDataElement.value = value;
        formDataElement.valid = this.checkValidity(value, formDataElement.validationRules);
        formDataElement.touched = true;
        formData[inputIdentifier] = formDataElement;


        const formIsValid = true;
        for (let id in formData) {
            formIsValid = formData[id].valid && formIsValid;
        }

        this.setState({ orderForm: formData, formIsValid: formIsValid });
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
            <form onSubmit={this.orderHandler}>
                {formElements.map(elem => (
                    <Input
                        key={elem.id}
                        elementType={elem.config.elementType}
                        elementConfig={elem.config.elementConfig}
                        value={elem.config.value}
                        invalid={!elem.config.valid}
                        shouldValidate={elem.config.validationRules}
                        touched={elem.config.touched}
                        validationErrorMessage={elem.config.validationRules.errorMessage}
                        changed={(event) => this.onInputChanged(event, elem.id)}
                    />
                ))}
                <Button buttonType="Success" disabled={!this.state.formIsValid}>OK</Button>
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