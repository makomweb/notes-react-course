import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import * as styles from './Auth.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import { updateObject, checkValidity } from '../../store/shared/utility';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignup: true
    }

    inputChangedHandler = (event, controlName) => {
        const { controls } = this.state;
        const { value } = event.target;
        const updatedControls = updateObject(controls, {
            [controlName]: updateObject(controls[controlName], {
                value: value,
                valid: checkValidity(value, controls[controlName].validation),
                touched: true
            })
        });

        this.setState({ controls: updatedControls });
    }

    onSubmit = (event) => {
        event.preventDefault();
        const { email, password } = this.state.controls;
        const { isSignup } = this.state;
        this.props.onAuth(email.value, password.value, isSignup);
    }

    toggleAuthMode = () => {
        this.setState(prevState => {
            return { isSignup: !prevState.isSignup }
        })
    }

    componentDidMount = () => {
        if (!this.props.building && this.props.authRedirectPath !== '/') {
            this.props.resetRedirectPath();
        }
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let errorPane = null;
        let form = null;

        const { loading, error, isAuthenticated } = this.props;
        if (loading) {
            form = <Spinner />
        }
        else {
            form = formElementsArray.map(formElement => (
                <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)} />
            ));
        }

        if (error) {
            errorPane = (
                <p>{error.message}</p>
            );
        }

        if (isAuthenticated) {
            return <Redirect to={this.props.authRedirectPath} />
        }

        const { isSignup } = this.state;

        return (
            <div className={styles.AuthData}>
                {errorPane}
                <form onSubmit={this.onSubmit}>
                    {form}
                    <Button btnType="Success">{isSignup ? 'Signup' : 'Login'}</Button>
                </form>
                <Button btnType="Danger"
                    clicked={this.toggleAuthMode}
                >Switch to {isSignup ? 'Login' : 'Signup'}</Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        building: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        resetRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);