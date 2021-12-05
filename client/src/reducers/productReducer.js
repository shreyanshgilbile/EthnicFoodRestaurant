const initialState = {
   items : null, 
   added : null,
   edited : null,
   skip : null,
   search : null
}


const productReducer = (state=initialState, action) => {

    let result;
    if(action.type === 'ITEM_EDITED') {
        result = state.items.result.map(item => {
            if(item._id === action.payload.id) {
                return {
                    _id : item._id,
                    ...action.payload.details
                }
            } 
            return item;
        })
    }
    
    if(action.type === 'ITEM_DELETED') { result =  state.items.result.filter(item => item._id !== action.payload); }
    
    switch(action.type) {
        case 'GET_ITEMS':
            return {
                added : null,
                edited : null,
                skip : state.skip,
                search : state.search,
                items : action.payload 
            }
        case 'ITEM_DELETED':
            return {
                added : state.added,
                edited : state.edited,
                skip : state.skip,
                search : state.search,
                items : {
                    length : state.items.length,
                    result : result
                }
            }    
        case 'ITEM_EDITED':
            return {
                added : state.added,
                edited : true,
                skip : state.skip,
                search : state.search,
                items : {
                    length : state.items.length,
                    result : result
                }
            }    
        case 'ITEM_ADDED':
            return {
                added : true,
                edited : state.edited,
                skip : state.skip,
                search : state.search,
                items : state.items
            }
        case 'RESET': 
            return {
                added : null,
                edited : null,
                skip : state.skip,
                search : state.search,
                items : state.items   
            }
        case 'SET_SEARCH_FIELDS': 
            return {
                skip : action.payload.skip,
                items : state.items,
                added : state.added,
                edited : state.edited,
                search : {
                    category : action.payload.category,
                    minPrice : action.payload.minPrice,
                    maxPrice : action.payload.maxPrice,
                    searchTerm : action.payload.searchTerm
                }
            }    
        default:
            return {
                ...state
            }
    }
}


export default productReducer;