const initialState = {
    token : localStorage.getItem('token'),
    isAuthenticated : null,
    user : null
}

export default function(state = initialState, action) {
    switch(action.type) {
        case 'REGISTRATION_SUCCESS':
        case 'LOGIN_SUCCESS':
        case 'USER_LOADED':    
            localStorage.setItem('token',action.payload.token)    
            return {
                token : action.payload.token,
                isAuthenticated : true,
                user : action.payload.user
            };    
        case 'LOGIN_FAILURE':
        case 'LOGOUT_FAILURE':     
        case 'REGISTRATION_FAILURE':
        case 'AUTH_FAILURE':               
        case 'LOGOUT_SUCCESS':      
            localStorage.removeItem('token');
            return {
                token : null,
                isAuthenticated : false,
                user : null
            };    
        default:
            return state;
    }
}

