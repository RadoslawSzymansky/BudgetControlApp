import {CHANGE_CURRENCY} from '../actions/constants/action-types'
const defaultSettings = {
    currentMonth: 0,
    currentCurrency: "PLN",
    currentView: "all",
}

export default function (state = defaultSettings , action) {
    switch (action.type) {
        case CHANGE_CURRENCY:
            const currentCurrency = action.payload;
            return {
                ...state,
                currentCurrency
            }
        default: 
            return state
    }
}