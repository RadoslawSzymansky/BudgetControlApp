import {UPDATE_WALLET,  ADD_INCOME, ADD_EXPENSE, REMOVE_EXPENSE, REMOVE_INCOME, CHANGE_CURRENCY, GET_INCOMES, ITEMS_LOADING, GET_EXPENSES} from './constants/action-types';
import axios from 'axios';

export const updateWallet = wallet => ({type: UPDATE_WALLET, payload: wallet});

export const removeIncome = (id) => ({type: REMOVE_INCOME, payload: id});
export const removeExpense = (id) => ({type: REMOVE_EXPENSE, payload: id });
export const changeCurrency = (curency) => ({ type: CHANGE_CURRENCY, payload: curency });

export const addInc = (transaction) => dispatch => {    
    axios.post('/api/incomes/add', transaction)
        .then(res => dispatch({
            type: ADD_INCOME,
            payload: transaction
        })).then(e => {
            console.log('dodany icnome')
        })
}

export const addExp = (transaction) => dispatch => {
    axios.post('/api/expenses/add', transaction)
    .then(res => dispatch({
            type: ADD_EXPENSE,
            payload: transaction
    }))
}
export const removeIncTransaction = id => dispatch => {
    console.log(id)
    axios.delete(`/api/incomes/${id}`)
        .then(res => dispatch({
            type: REMOVE_INCOME,
            payload: id
        })).then(e => {
            console.log('usunieto')
        })
}
export const removeExpTransaction = id => dispatch => {
    console.log(id)
    axios.delete(`/api/expenses/${id}`)
        .then(res => dispatch({
            type: REMOVE_EXPENSE,
            payload: id
        })).then(e=>{
            console.log('usunieto')
        })
}
export const getItems = () => dispatch => {
    console.log('a')
    dispatch(setItemsLoading())
    axios
        .get('/api/incomes')
        .then(res => dispatch({
            type: GET_INCOMES,
            payload: res.data
        }));
    axios
        .get('/api/expenses')
        .then(res => dispatch({
            type: GET_EXPENSES,
            payload: res.data
        }))
}; 
export const setItemsLoading = () => {
    return {
        type: ITEMS_LOADING
    }
}