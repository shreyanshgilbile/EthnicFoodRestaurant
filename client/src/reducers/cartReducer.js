const initialState = {
    items : [],
    total : 0,
    placed : false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case 'ADD_TO_CART':
            return {
                items : action.payload.items,
                total : action.payload.total,
                placed : false
            }
        case 'ORDER_PLACED':
            return {
                items : [],
                total : 0,
                placed : true
            }
        case 'ORDER_RESET':
            return {
                items : [],
                total : 0,
                placed : false
            }
        default:
            return state;
    }
}