import React, { Component } from 'react';
import Button from '../../../Components/UI/Button/Button.js';
import classes from './ContactData.css';
import AxiosInstance from '../../../AxiosInstance.js';
import Spinner from '../../../Components/UI/Spinner/Spinner.js';
import Input from '../../../Components/UI/Input/Input.js';
import { connect } from 'react-redux';
import ErrorModal from '../../../HOC/ErrorModal/ErrorModal';
import * as actions from '../../../Store/Actions';

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
                    errormessage: 'Please enter a valid name!'
                },
                valid: false,
                touched: false
            },
            street: {
                type: 'input',
                config: {
                    type: 'text',
                    placeholder: 'Your street',
                    errormessage: 'Please enter a valid street!'
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
                    errormessage: 'Please enter a valid ZIP code!'
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
                    errormessage: 'Please enter a valid country!'
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
                    errormessage: 'Please enter a valid email address!'
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                type: 'select',
                config: {
                    options: [
                        { value: 'fast', displayValue: 'Fast' },
                        { value: 'cheap', displayValue: 'Cheap' },
                    ]
                },
                value: 'fast',
                validation: {},
                valid: true
            },
        },
        formIsValid: false
    }

    onOrderTapped = event => {
        event.preventDefault();

        const formData = {};
        for (let key in this.state.orderForm) {
            formData[key] = this.state.orderForm[key].value;
        }

        const { ingredients, price, token } = this.props;
        const order = {
            ingredients: ingredients,
            price: price,
            customer: formData,
            userId: this.props.userId
        }

        this.props.submitOrder(token, order);
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

        let formIsValid = true;
        for (let inputId in updatedForm) {
            formIsValid = updatedForm[inputId].valid && formIsValid
        }

        this.setState({
            orderForm: updatedForm,
            formIsValid: formIsValid
        });
    }

    isValid(value, rules) {
        if (!rules) {
            return true;
        }

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

    componentDidMount = () => {
        const prefilled = {
            name: 'Martin',
            street: 'Teststreet',
            zip: '12345',
            country: 'Germany',
            email: 'foo@bar.com'
        }

        this.setState((prevState) => {
            const obj = {
                ...prevState,
            };

            const { orderForm } = obj;
            orderForm.name.value = prefilled.name;
            orderForm.street.value = prefilled.street;
            orderForm.email.value = prefilled.email;
            orderForm.zipCode.value = prefilled.zip;
            orderForm.country.value = prefilled.country;

            obj.formIsValid = true;

            return obj;
        });
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
                        errormessage={elem.data.validation ? elem.data.validation.errormessage : null}
                        shouldValidate={elem.data.validation}
                        touched={elem.data.touched}
                        changed={(event) => this.onInputChanged(event, elem.id)} />
                ))}
                <Button buttonType="Success"
                    disabled={!this.state.formIsValid}
                    clicked={this.onOrderTapped}>ORDER</Button>
            </form>
        );

        if (this.props.loading) {
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

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const dispatchToProps = dispatch => {
    return {
        submitOrder: (token, order) => dispatch(actions.purchaseBurger(token, order))
    }
}
export default connect(mapStateToProps, dispatchToProps)(ErrorModal(ContactData, AxiosInstance));