// import {incomes} from '../tempData/index';
import { ADD_INCOME, REMOVE_INCOME , GET_INCOMES,} from '../actions/constants/action-types'
import uuid from 'uuid'
import _ from 'lodash';
export default function incomesData(state= {}, action) {
    switch (action.type) {
        case ADD_INCOME:
              return ({
                ...state,
                [uuid()]: action.payload
            });
        case REMOVE_INCOME:
            const newState = { ...state }
            delete newState[action.payload]
            let index = ''; 
            _.forEach(newState, (inc, i)=>{
                if(inc._id === action.payload) index = i;
            })
            delete newState[index]
            return ({
                ...newState
            })
        case GET_INCOMES:
            console.log('get incomes2222')
            return ({
                ...action.payload,
            })
        default:
            return state;
  }
}