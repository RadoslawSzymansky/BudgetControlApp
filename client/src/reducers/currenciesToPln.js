import {defaultCurrencies} from '../tempData';
export default function (state = defaultCurrencies, action){ 
    switch (action.type) {
        case "aa":
            return state;
        default: 
            return state;
    }
}