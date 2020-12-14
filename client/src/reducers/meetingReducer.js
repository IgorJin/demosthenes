const initialState = {}

const meetingReducer = (state = initialState, action) => {
    switch(action.type){
        case 'MEETING_COME': 
            return {
                ...state,
                onVebinar:true
            }
        case 'SET_MEETING': 
           return {
                ...state,
                meeting : action.meeting
           } 
        default:
            return state
    }
}

export default meetingReducer