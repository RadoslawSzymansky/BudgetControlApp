import {CHANGE_CURRENCY, IS_EXP_LOADING, IS_INC_LOADING, IS_REMOVING} from '../actions/constants/action-types';

const defaultSettings = {
    currentMonth: 0,
    currentCurrency: "PLN",
    currentView: "all",
    expLoading: false,
    incLoading: false,
    isRemoving: false
};

export default function (state = defaultSettings , action) {
    switch (action.type) {
        case CHANGE_CURRENCY:
            return {
                ...state,
                currentCurrency: action.payload
            }
        case IS_EXP_LOADING:
            return {
                ...state,
                expLoading: action.payload
            }
        case IS_INC_LOADING:
            return {
                ...state,
                incLoading: action.payload
            }
        case IS_REMOVING: 
            return {
                ...state,
                isRemoving: action.payload
            }
        default: 
            return state
    }
};