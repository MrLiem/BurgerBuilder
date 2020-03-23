import * as actionTypes from '../actions/actionTypes'
import updateObject from '../../shared/utility'
const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
}

const authStart = (state, action) => {
    return updateObject(state, { token: null, userId: null, error: null, loading: true })
}

const authSuccess = (state, action) => {
    return updateObject(state, { token: action.token, userId: action.userId, loading: false })
}

const authFailed = (state, action) => {
    return updateObject(state, { error: action.error, loading: false })
}

const logOut = (state, action) => {
    return updateObject(state, { token: null, userId: null })
}

const setAuthRedirectPath=(state,action)=>{
    return updateObject(state,{authRedirectPath: action.authRedirectPath})
}
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return authStart(state, action)
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action)
        case actionTypes.AUTH_FAILED:
            return authFailed(state, action)
        case actionTypes.LOG_OUT:
            return logOut(state, action)
        case actionTypes.SET_AUTH_REDIRECT_PATH:
            return setAuthRedirectPath(state,action);
        default:
            return state;
    }
}

export default authReducer