import React, { Component } from 'react';

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
                    isEmail: true
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
                    minLength: 6
                },
                valid: false,
                touched: false,
                value: ''
            }
        }
    }

    render() {
        return (
            <div>
                <form>

                </form>
            </div>
        );
    }
}

export default Auth;