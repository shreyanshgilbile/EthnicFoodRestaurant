import axios from 'axios';


export const limit = 4;

export const setError = (dispatch, msg, status, id) => {
    dispatch({
        type : 'SET_ERROR',
        payload : {
            msg,
            status,
            id
        }
    });
}

export const signUpUser = (dispatch, name, email, phnno, password) => {

    axios.post('/user/register',{name, email, phnno, password})
        .then(res => {
            dispatch({
                type : 'CLEAR_ERROR'
            });
            dispatch({
                type: 'REGISTRATION_SUCCESS',
                payload: { ...res.data,
                    token : res.headers['auth-token']
                }
            });
        })
        .catch(err => {
            setError(dispatch, err.response.data.message, err.response.status, 'REGISTRATION_FAILURE');
            dispatch({
                type: 'REGISTRATION_FAILURE'
            });
        })
}

export const signInUser = (dispatch, email, password) => {

    axios.post('/user/login',{email, password})
        .then(res => {
            dispatch({
                type : 'CLEAR_ERROR'
            });
            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: { ...res.data,
                    token : res.headers['auth-token']
                }
            });
        })
        .catch(err => {
            setError(dispatch, err.response.data.message, err.response.status, 'LOGIN_FAILURE');
            dispatch({
                type: 'LOGIN_FAILURE'
            });
        })
}

export const logoutUser = (dispatch, id, token) => {

    const headers = getConfig(token).header;

    axios.post('/user/logout', {id}, { headers : headers })
        .then(res => {
            dispatch({
                type : 'CLEAR_ERROR'
            });
            dispatch({
                type : 'LOGOUT_SUCCESS'
            });
        })
        .catch(err => {
            setError(dispatch, err.response.data.message, err.response.status, 'LOGOUT_FAILURE');
            dispatch({
                type : 'LOGOUT_FAILURE'
            });
        })
}

export const loadUser = (dispatch, token) => {

    const headers = getConfig(token).header;

    axios.get('/user', {headers : headers})
        .then(res => {
            dispatch({
                type : 'CLEAR_ERROR'
            });
            dispatch({
                type : 'USER_LOADED',
                payload : {
                    ...res.data,
                    token : token
                }
            });
        })
        .catch(err => {
            setError(dispatch, err.response.data.message, err.response.status, 'AUTH_FAILURE');
            dispatch({
                type : 'AUTH_FAILURE'
            });

        })
}

export const addProduct = (dispatch, token, productName, description, price, qty, category, file) => {

    let fd = new FormData();
    fd.append('productName', productName);
    fd.append('description', description);
    fd.append('price', price);
    fd.append('qty', qty);
    fd.append('category', category);
    fd.append('images', file, file.name);

    axios.post('/products/add', fd, {headers : getConfig(token,'multipart/form-data').header})
        .then(res => {
            dispatch({
                type : 'CLEAR_ERROR'
            });
            dispatch({
                type : 'ITEM_ADDED'
            });
        })
        .catch(err => {
            
            setError(dispatch, err.response.data.message, err.response.status, 'ITEM_ADD_FAILURE');
        })
}

export const editProduct = (dispatch, token, productName, description, price, qty, category, file, id) => {

    let fd = new FormData();
        fd.append('productName', productName);
        fd.append('description', description);
        fd.append('price', price);
        fd.append('qty', qty);
        fd.append('category', category);

    if(file) {
        fd.append('images', file, file.name); 
    }

    axios.put(`/products/${id}`, fd, {headers : getConfig(token,'multipart/form-data').header})
        .then(res => {
            dispatch({
                type : 'CLEAR_ERROR'
            });
            dispatch({
                type : 'ITEM_EDITED',
                payload : {id, details : {productName, description, price, qty, category}}
            });
        })
        .catch(err => {
            
            setError(dispatch, err.response.data.message, err.response.status, 'ITEM_EDIT_FAILURE');
        })

}

export const deleteProduct = (dispatch, id, token) => {
    
    axios.delete(`/products/${id}`, {headers: getConfig(token).header})
        .then(res => {
            
            dispatch({
                type : 'CLEAR_ERROR'
            });

            dispatch({
                type : 'ITEM_DELETED',
                payload : id
            })
        })
        .catch(err => {

            setError(dispatch, err.response.data.message, err.response.status, 'ITEM_DELETE_FAILURE');
        })
}

export const getProducts = (dispatch, category, minPrice, maxPrice, searchTerm, skip=0) => {
    let query = '/products/?category=';

    if(category) {
        query += category;
    }
    query += '&minprice='
    if(minPrice) {
        query += minPrice;
    }
    query += '&maxprice='
    if(maxPrice) {
        query += maxPrice;
    }
    query += '&searchTerm='
    if(searchTerm) {
        query += searchTerm;
    }
    query += '&limit='+limit+'&skip='+skip;
    //request for data
    axios.get(query)
        .then(res => { dispatch({
            type : 'GET_ITEMS',
            payload : res.data
            });
            dispatch({
                type: 'SET_SEARCH_FIELDS',
                payload: {category, minPrice, maxPrice, searchTerm, skip}
            }); 
        })
        .catch(err => setError(dispatch, err.response.data.message, err.response.status, 'ITEMS_FETCH_FAILURE'))
}

export const placeOrder = (dispatch, cart, user, orderType, token) => {

    axios.post('/orders/add', {cart, user, orderType}, {headers: getConfig(token).header})
        .then(res => {
                
        dispatch({
            type : 'CLEAR_ERROR'
        })

        dispatch({
            type : 'ORDER_PLACED' 
        })

        })
        .catch(err => setError(dispatch, err.response.data.message, err.response.status, 'ORDER_FAILURE'))
}

export const getOrders = (dispatch, token) => {
   
    axios.get('/orders', {headers: getConfig(token).header})
        .then(res => {
            
            dispatch({
                type : 'CLEAR_ERROR'
            })

            dispatch({
                type : 'GET_ORDERS',
                payload : res.data
            })
            
        })
        .catch(err => {
            setError(dispatch, err.response.data.message, err.response.status, 'ORDER_FAILURE');
        })
}

export const getConfig = (token, contentType='application/json') => {
    const config = {
        header : {
            'Content-Type' : contentType
        }
    }
    if(token) {
        config.header['auth-token'] = token;
    }
    return config;
}

