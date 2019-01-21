import * as actionTypes from './actionTypes';
import axios from 'axios';

// action creators for authentication

const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    }
}

const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: error
    }
}

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const data = {
            email: email,
            password: password,
            returnSecureToken: true
        }

        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBJCm83JVeTqMxl9MOA03PHA6ogt-Nkr-Y';
        if (!isSignup) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBJCm83JVeTqMxl9MOA03PHA6ogt-Nkr-Y';
        }

        axios.post(url, data)
            .then(response => {
                console.log(response);
                const { idToken, localId } = response.data;
                dispatch(authSuccess(idToken, localId));
            })
            .catch(ex => {
                console.log(ex);
                const { error } = ex.response.data.error;
                dispatch(authFail(error));
            });
    }
}