import {UPDATE_WALLET} from '../actions/constants/action-types';
const defaultWallet = {
    expPercent: "0",
    expsValue: 0,
    incsValue: 0,
    cash: 0,
};

export default function (state = defaultWallet, action) {
    switch (action.type) {
        case UPDATE_WALLET:
            return {
                ...action.payload
            };
        default:
            return state;
    };  
};