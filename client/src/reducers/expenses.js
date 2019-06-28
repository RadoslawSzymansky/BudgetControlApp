import { ADD_EXPENSE , REMOVE_EXPENSE, GET_EXPENSES} from '../actions/constants/action-types';
import _ from 'lodash';
import uuid from 'uuid'
export default function incomesData(state = {}, action) {
    switch (action.type) {
        case GET_EXPENSES:
            return ({
                ...action.payload
            })
        case ADD_EXPENSE:
            const key = _.map(state).length + 1;
            return ({
                ...state,
                [key]: action.payload
            });
        case REMOVE_EXPENSE:
            const newState = { ...state }
            delete newState[action.payload]
            let index = '';
            _.forEach(newState, (inc, i) => {
                if (inc._id === action.payload) index = i;
            })
            delete newState[index]
            return ({
                ...newState
            })
        default: 
            return state;
    }
}