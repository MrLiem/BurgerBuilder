import * as actionTypes from './actionTypes'
import axios from 'axios'
export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token,
        userId
    }
}

const authFailed = (errorMessage) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: errorMessage
    }
}

export const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('userId')
    return {
        type: actionTypes.LOG_OUT
    }
}
const checkAuthTimeOut = (expiresIn) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logOut());
        }, expiresIn *1000 )
    }

}
export const auth = (email, password, isSignUp) => {
    return  dispatch => {
        dispatch(authStart())
        const authData = {
            email,
            password,
            returnSecureToken: true
        }
        let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyADbbneQmEyqyjR9Syl0E0zx6_j7rrIRMg"
        if (!isSignUp) {
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyADbbneQmEyqyjR9Syl0E0zx6_j7rrIRMg"
        }
        axios.post(url, authData)
            .then( res => {
                localStorage.setItem('token',res.data.idToken)
                localStorage.setItem('expirationDate',new Date(new Date().getTime()+res.data.expiresIn *1000))
                localStorage.setItem('userId',res.data.localId)
                dispatch(authSuccess(res.data.idToken, res.data.localId))
                dispatch(checkAuthTimeOut(res.data.expiresIn))
            })
            .catch(err => {
                dispatch(authFailed(err.response.data.error.message))

            })
    }
}

export const setAuthRedirectPath=(path)=>{
    return{
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        authRedirectPath:path
    }
}

export const checkAuthState=()=>{
    return async dispatch=>{
        const token= await localStorage.getItem('token')
    
        if(!token){
            dispatch(logOut())
        }else{
            const expirationDate= await new Date(localStorage.getItem('expirationDate'));
            if(expirationDate>new Date()){
                const userId=await localStorage.getItem('userId')
                dispatch(authSuccess(token,userId))          
                 dispatch(checkAuthTimeOut((expirationDate.getTime()-new Date().getTime())/1000))
            }else{
                dispatch(logOut())
            }
        }
    }
}