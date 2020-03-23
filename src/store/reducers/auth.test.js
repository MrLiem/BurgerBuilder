import authReducer from './auth'
import * as actionTypes from '../actions/actionTypes'


it('should return the initial state',()=>{
    expect(authReducer(undefined,{})).toEqual({
        token: null,
        userId: null,
        error: null,
        loading: false,
        authRedirectPath: '/'
    })
})

it('should store the token upon login',()=>{
    expect(authReducer({
        token: null,
        userId: null,
        error: null,
        loading: false,
        authRedirectPath: '/'
    },{
        type: actionTypes.AUTH_SUCCESS,
        token: 'MY_TOKEN',
        userId: 123
    })).toEqual({
        token: 'MY_TOKEN',
        userId: 123,
        error: null,
        loading: false,
        authRedirectPath: '/'
    })
})