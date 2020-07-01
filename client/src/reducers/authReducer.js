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
        default:
            return state;
        }
    }

export default authReducer