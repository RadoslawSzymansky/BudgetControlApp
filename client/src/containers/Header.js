import React from 'react';
import store from '../store';
import { months } from '../tempData';
import './styles/Header.scss';
import { connect } from 'react-redux';
const Header = props => {
    const {expPercent, incsValue, expsValue, cash } = props.wallet;
    const currency = store.getState().settings.currentCurrency;
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    return (
        <header className="wallet">
            <h3>Avaible Budget in <span className="currentDate">{months[month]} {year}</span></h3>
            <h3 style={cash > 0 ? { color: "darkcyan", fontSize: 42 } : { color: "red" }}>{cash} <span className="cur">{currency}</span></h3>
            <div className="stateBelt income">
                <p className="desc">INCOME</p><p className="amount">+ {incsValue} <span className="cur">{currency}</span></p>
            </div>
            <div className="stateBelt expense">
                <p className="desc">EXPENSES</p><p className="amount">- {expsValue} <span className="cur">{currency}</span></p>
            <span className="expensesPercent">{expPercent <= 0 || !expsValue ? "0" : expPercent}%</span>
            </div>
        </header>
    )
}
const mapStateToProps = function (state) {
    return {
        wallet: state.wallet,
    }
}

export default  connect(mapStateToProps)(Header);