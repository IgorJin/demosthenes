const initialState = {
    currentUser: {
        displayName: 'User',
        email: 'user@gmail.com'
    }
}

const authReducer = (state = initialState, action) => {
    switch(action.type){
        case 'LOGIN_USER':
            return {
                ...state,
                currentUser:action.playload,
                isLogin: action.isLogin
            };
        case 'GET_WEBINARS':
            return {
                ...state,
                currentUser: {...state.currentUser, webinars: action.allWebinars}
            }
        default:
            return state;
        }
    }

export default authReducer