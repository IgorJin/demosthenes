const initialState = {}

const webinarReducer = (state = initialState, action) => {
    switch(action.type){
        case 'WEBINAR_COME': 
            return {
                ...state,
                onVebinar:true
            }
        default:
            return state
    }
}

export default webinarReducer