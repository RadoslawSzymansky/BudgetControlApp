import React from 'react';
import {connect} from 'react-redux';
import {changeCurrency} from '../actions/index';
const CurrencySelect = props => {
    console.log('currency', props)
    return (
        <div className="currencySelect" >
            <label htmlFor="curChoice" > Show in: </label>
            <select name="currencyChoice"
                id="curChoice"
                onChange={e=> props.changeCurrency(e.target.value)}
                value={props.currentCurrency} >
                <option value="PLN" > PLN </option>
                <option value="GBP" > GBP </option>
                <option value="USD" > USD </option>
                <option value="EUR" > EUR </option>
            </select >
        </div>
    )
}
const mapStateToProps = state => ({currentCurrency: state.settings.currentCurrency})
export default connect(mapStateToProps, {changeCurrency})(CurrencySelect);