import React, { Component } from 'react';
import Input from '../../Components/UI/Input/Input';
import Button from '../../Components/UI/Button/Button';
import styles from './Auth.css';
import * as actions from '../../Store/Actions';
import { connect } from 'react-redux';

class Auth extends Component {

    state = {
        controls: {
            email: {
                type: 'input',
                config: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                validation: {
                    required: true,
                    isEmail: true,
                    errormessage: 'Please enter a valid email address!'
                },
                valid: false,
                touched: false,
                value: ''
            },

            password: {
                type: 'input',
                config: {
                    type: 'password',
                    placeholder: 'Password'
                },
                validation: {
                    required: true,
                    minLength: 6,
                    errormessage: 'Your password must be at least 6 characters long!'
                },
                valid: false,
                touched: false,
                value: ''
            }
        },
        formIsValid: false,
        isSignup: false
    }

    onInputChanged = (event, controlName) => {
        const { value } = event.target;

        const updatedForm = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: value,
                valid: this.isValid(value, this.state.controls[controlName].validation),
                touched: true
            }
        };

        this.setState({ controls: updatedForm });
    }

    isValid(value, rules) {
        if (!rules) {
            return true;
        }

        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        if (rules.isEmail) {
            const pattern = /^\S+@\S+\.\S+$/;
            isValid = pattern.test(value) && isValid;
        }

        return isValid;
    }

    onSubmitted = event => {
        event.preventDefault();
        const { email, password } = this.state.controls;
        const { isSignup } = this.state;
        this.props.submit(email.value, password.value, isSignup);
    }

    onSwitchMode = () => {
        this.setState(previous => {
            return { isSignup: !previous.isSignup }
        })
    }

    render() {
        const { controls } = this.state;
        const formElements = [];
        for (let key in controls) {
            formElements.push({
                id: key,
                data: controls[key],
            });
        }

        const form = formElements.map(elem => (
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
        ));

        return (
            <div className={styles.Auth}>
                <form onSubmit={this.onSubmitted}>
                    {form}
                    <Button buttonType="Success"
                        clicked={this.onSubmitted}>SUBMIT</Button>
                </form>
                <Button buttonType="Danger"
                    clicked={this.onSwitchMode}>
                    SWITCH to {this.state.isSignup ? 'LOGIN' : 'SIGNUP'}</Button>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        submit: (email, password, isSignup) => dispatch(actions.authenticate(email, password, isSignup))
    }
}

export default connect(null, mapDispatchToProps)(Auth);