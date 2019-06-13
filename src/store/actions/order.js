import * as actionTypes from './actionTypes'
import axios from '../../axios-orders';

export const purchaseTasksSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_TASKS_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseTasksFail = (error) => {
    return {
        type: actionTypes.PURCHASE_TASKS_FAIL,        
        error: error
    }
}
export const purchaseTasksStart = () => {
    return {
        type: actionTypes.PURCHASE_TASKS_START
    }
}

export const purchaseTasks = (orderData, token) => {
    return dispatch =>{
        dispatch(purchaseTasksStart())
        axios.post( '/orders.json?auth=' + token, orderData )
            .then( response => {
                console.log(response.data)
                dispatch(purchaseTasksSuccess(response.data.name, orderData))
            } )
            .catch( error => {
                dispatch(purchaseTasksFail( error ))

            } );
    }
    
}
export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START,
    }
}
export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}
export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}
export const fetchOrders = (token) => {
    return dispatch => {
        axios.get('/orders.json?auth=' + token)
        .then(res => {
            const fetchedOrders = [];
            for (let key in res.data) {
                fetchedOrders.push({
                    ...res.data[key],
                    id: key
                });
            }
            dispatch (fetchOrdersSuccess(fetchedOrders))            
        })
        .catch(err => {
            dispatch (fetchOrdersFail(err))
        });
}
}