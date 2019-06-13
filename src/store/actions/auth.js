import * as actionTypes from './actionTypes'
import axios from 'axios';


export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId,

    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,        
        error: error
    }
}
export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}
export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}
export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationTime * 1000)
    }
}

export const auth = (email, password, isSignUp) => {
    return dispatch =>{
        dispatch(authStart());
        console.log(JSON.stringify(email) + ' ' + password)
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key='
        if(isSignUp){
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' //signin
        }
        
        const api_key = 'AIzaSyBwRddkx6OVssLw7DeUyn-1PTZnTO-Dg_w'

        axios.post(
            url + api_key,
            authData
        )
        .then(response => {
            console.log(response)
            dispatch(authSuccess(response.data.idToken, response.data.localId))
            dispatch(checkAuthTimeout(response.data.expiresIn))
        })
        .catch(err => {
            console.log(err)
            dispatch(authFail(err.response.data.error))
        })
         
    }
}