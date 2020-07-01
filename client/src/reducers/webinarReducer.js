const initialState = {}

const webinarReducer = (state = initialState, action) => {
    switch(action.type){
        case 'WEBINAR_COME': 
            return {
                ...state,
                onVebinar:true
            }
        case 'GET_WEBINAR':
            return {
                ...state,
                webinars: action.allWebinars
            }
        default:
            return state
    }
}

export default webinarReducer