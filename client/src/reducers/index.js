import {combineReducers} from 'redux';
import incomes from './incomes';
import expenses from './expenses';
import settings from './settings';
import wallet from './wallet';
import currenciesToPln from './currenciesToPln';

export default combineReducers({
    incomes,
    expenses,
    settings,
    wallet, 
    currenciesToPln
});