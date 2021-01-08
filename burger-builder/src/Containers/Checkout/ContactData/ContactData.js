import React, { useEffect, useState } from 'react';
import Button from '../../../Components/UI/Button/Button.js';
import classes from './ContactData.css';
import AxiosInstance from '../../../AxiosInstance.js';
import Spinner from '../../../Components/UI/Spinner/Spinner.js';
import Input from '../../../Components/UI/Input/Input.js';
import { connect } from 'react-redux';
import ErrorModal from '../../../HOC/ErrorModal/ErrorModal';
import * as actions from '../../../Store/Actions';
import { updateObject, isValid } from '../../../Shared/Utility';

const ContactData = props => {
    const [orderForm, setOrderForm] = useState({
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
                isEmail: true,
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
    });

    const [formIsValid, setFormIsValid] = useState(false);

    const onOrderTapped = event => {
        event.preventDefault();

        const formData = {};
        for (let key in orderForm) {
            formData[key] = orderForm[key].value;
        }

        const { ingredients, price, token } = props;
        const order = {
            ingredients: ingredients,
            price: price,
            customer: formData,
            userId: props.userId
        }

        props.submitOrder(token, order);
    }

    const onInputChanged = (event, inputId) => {
        const control = orderForm[inputId];
        const updatedFormElement = updateObject(control, {
            value: event.target.value,
            valid: isValid(event.target.value, control.validation),
            touched: true
        });


        const updatedForm = updateObject(orderForm, {
            [inputId]: updatedFormElement
        });

        let formIsValid = true;
        for (let inputId in updatedForm) {
            formIsValid = updatedForm[inputId].valid && formIsValid
        }

        setOrderForm(updatedForm);
        setFormIsValid(formIsValid);
    }

    useEffect(() => {
        const prefilled = {
            name: 'Martin',
            street: 'Teststreet',
            zip: '12345',
            country: 'Germany',
            email: 'foo@bar.com'
        }

        setOrderForm(prevState => {
            const orderForm = {
                ...prevState,
            };

            orderForm.name.value = prefilled.name;
            orderForm.street.value = prefilled.street;
            orderForm.email.value = prefilled.email;
            orderForm.zipCode.value = prefilled.zip;
            orderForm.country.value = prefilled.country;
            return orderForm;
        });

        setFormIsValid(true);
    }, []);

    const formElements = [];
    for (let key in orderForm) {
        formElements.push({
            id: key,
            data: orderForm[key],
        });
    }

    let form = (
        <form onSubmit={onOrderTapped}>
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
                    changed={(event) => onInputChanged(event, elem.id)} />
            ))}
            <Button buttonType="Success"
                disabled={!formIsValid}
                clicked={onOrderTapped}>ORDER</Button>
        </form>
    );

    if (props.loading) {
        form = <Spinner />
    }

    return (
        <div className={classes.ContactData}>
            <h4>Enter your contact data:</h4>
            {form}
        </div>
    );
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