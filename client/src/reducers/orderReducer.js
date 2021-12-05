const initialState = {
    data : null
}

export default function(state=initialState, action) {
    switch(action.type) {
        case 'GET_ORDERS':
            return {
                data : action.payload
            }
        default : 
            return state;
    }
}