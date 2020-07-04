const initialState = {}

const webinarReducer = (state = initialState, action) => {
    switch(action.type){
        case 'WEBINAR_COME': 
            return {
                ...state,
                onVebinar:true
            }
        case 'SET_WEBINAR': 
           return {
                ...state,
                webinar : action.webinar
           } 
        default:
            return state
    }
}

export default webinarReducer