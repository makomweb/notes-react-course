import React, { Component } from 'react';
import Input from '../../Components/UI/Input/Input';
import Button from '../../Components/UI/Button/Button';

class Auth extends Component {

    state = {
        controls: {
            name: {
                elementType: 'input',
                elementConfig: {
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
                elementType: 'input',
                elementConfig: {
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
        }
    }

    render() {
        const formElements = [];
        for (let key in this.state.orderForm) {
            formElements.push({
                id: key,
                data: this.state.orderForm[key],
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

        // if (this.props.loading) {
        //     form = <Spinner />
        // }

        return (
            <div>
                <form onSubmit={this.onOrderTapped}>
                    {form}
                    {/* <Button buttonType="Success"
                        disabled={!this.state.formIsValid}
                        clicked={this.onOrderTapped}>SUBMIT</Button> */}
                    <Button buttonType="Success">SUBMIT</Button>
                </form>
            </div>
        );
    }
}

export default Auth;