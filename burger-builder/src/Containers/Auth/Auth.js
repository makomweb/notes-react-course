import React, { useEffect, useState } from 'react';
import Input from '../../Components/UI/Input/Input';
import Button from '../../Components/UI/Button/Button';
import styles from './Auth.css';
import * as actions from '../../Store/Actions';
import { connect } from 'react-redux';
import Spinner from '../../Components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import { updateObject, isValid } from '../../Shared/Utility';

const Auth = props => {
    const [state, setState] = useState({
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
                value: 'foo@bar.com'
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
                value: '123456'
            }
        }
    });
    const [isSignup, setIsSignup] = useState(false);

    const onInputChanged = (event, controlName) => {
        const { value } = event.target;
        const updatedForm = updateObject(state.controls, {
            [controlName]: updateObject(state.controls[controlName], {
                value: value,
                valid: isValid(value, state.controls[controlName].validation),
                touched: true
            })
        });

        setState({ controls: updatedForm });
    }

    const onSubmitted = event => {
        event.preventDefault();
        const { email, password } = state.controls;
        props.submit(email.value, password.value, isSignup);
    }

    const onSwitchMode = () => {
        setIsSignup(!isSignup);
    }

    const { isBuilding, authRedirectPath, resetAuthRedirectPath } = props;
    useEffect(() => {
        // trying to go to checkout even though not building a burger
        if (!isBuilding && authRedirectPath !== '/') {
            resetAuthRedirectPath();
        }
    }, [isBuilding, authRedirectPath, resetAuthRedirectPath]);

    const { controls } = state;
    const formElements = [];
    for (let key in controls) {
        formElements.push({
            id: key,
            data: controls[key],
        });
    }

    let form = formElements.map(elem => (
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
    ));

    if (props.loading) {
        form = <Spinner />
    }

    const errorMessage =
        props.error ?
            <p>{props.error.message}</p> : null;

    const authRedirect =
        props.isAuthenticated ?
            <Redirect to={props.authRedirectPath} /> : null;

    return (
        <div className={styles.Auth}>
            {authRedirect}
            {errorMessage}
            <form onSubmit={onSubmitted}>
                {form}
                <Button buttonType="Success"
                    clicked={this.onSubmitted}>SUBMIT</Button>
            </form>
            <Button buttonType="Danger"
                clicked={onSwitchMode}>
                SWITCH to {isSignup ? 'LOGIN' : 'SIGNUP'}</Button>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        isBuilding: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        submit: (email, password, isSignup) => dispatch(actions.authenticate(email, password, isSignup)),
        resetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);