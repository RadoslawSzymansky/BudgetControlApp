import {
    UPDATE_WALLET,
    ADD_INCOME, 
    ADD_EXPENSE, 
    REMOVE_EXPENSE, 
    REMOVE_INCOME, 
    CHANGE_CURRENCY, 
    GET_INCOMES, 
    ITEMS_LOADING, 
    GET_EXPENSES, 
    IS_EXP_LOADING, 
    IS_INC_LOADING,
    IS_REMOVING
} from './constants/action-types';
import axios from 'axios';

export const updateWallet = wallet => ({type: UPDATE_WALLET, payload: wallet});

export const changeCurrency = (curency) => ({ type: CHANGE_CURRENCY, payload: curency });

export const addInc = (transaction) => dispatch => {    
    axios.post('/api/incomes/add', transaction)
    .then(res => transaction._id = res.data)
    .then(res => dispatch({
        type: ADD_INCOME,
        payload: transaction
    }))
}

export const addExp = (transaction) => dispatch => {
    axios.post('/api/expenses/add', transaction)
    .then(res => transaction._id = res.data)
    .then(res => dispatch({
            type: ADD_EXPENSE,
            payload: transaction
    }))
}

export const removeIncTransaction = id => dispatch => {
    dispatch({
        type: IS_REMOVING,
        isRemoving: true,
    })
    axios.delete(`/api/incomes/${id}`)
        .then(res => dispatch({
            type: REMOVE_INCOME,
            payload: id
        })).then(e => {
            dispatch({
                type: IS_REMOVING,
                isRemoving: true,
            })
        })
}
export const removeExpTransaction = id => dispatch => {
    dispatch({
        type: IS_REMOVING,
        isRemoving: true,
    })
    axios.delete(`/api/expenses/${id}`)
        .then(res => dispatch({
            type: REMOVE_EXPENSE,
            payload: id
        })).then(e=>{
            dispatch({
                type: IS_REMOVING,
                isRemoving: false,
            })
        })
}
export const getItems = () => dispatch => {
    dispatch(setItemsLoading())
    dispatch({ type: IS_INC_LOADING, payload: true })
    dispatch({ type: IS_EXP_LOADING, payload: true })
    axios
        .get('/api/incomes')
        .then(res => {
            dispatch({ type: GET_INCOMES, payload: res.data,});
            dispatch({ type: IS_INC_LOADING, payload: false })
        })
    axios
        .get('/api/expenses')
        .then(res => {
            dispatch({ type: GET_EXPENSES, payload: res.data,});
            dispatch({ type: IS_EXP_LOADING, payload: false });
    });
}; 
export const setItemsLoading = () => {
    return {
        type: ITEMS_LOADING
    }
}
