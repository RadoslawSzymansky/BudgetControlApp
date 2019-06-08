import React from 'react';
import './styles/App.scss';
import Header from './Header';
import Form from './Form';
import TransactionsPanel from './TransactionsPanel';
import _ from 'lodash';
import {updateWallet, getItems} from '../actions/index';
import { connect } from 'react-redux';
import CurrencySelect from '../containers/CurrencySelect';

class App extends React.Component {
  componentDidMount(){  
    // zaktualizowac wallet w w store
    console.log('componenDidMount')
    const wallet = this.calcWallet();
    this.props.updateWallet(wallet);
    this.props.getItems();
  }
  componentDidUpdate(){
     const wallet = this.calcWallet();
     this.props.updateWallet(wallet)
  }
  calcWallet = () => {
    const {expenses, incomes, currentCurrency} = this.props;
    let expsValue = 0;
    let incsValue = 0;
    _.forEach(expenses, e => expsValue += this.calcCurrency(e.value, e.currency, currentCurrency));
    _.forEach(incomes, e => incsValue += this.calcCurrency(e.value, e.currency, currentCurrency));
    expsValue = parseFloat(expsValue.toFixed(2))
    incsValue = parseFloat(incsValue.toFixed(2))
    let cash = parseFloat((incsValue - expsValue).toFixed(2))
    let expPercent = !incsValue ? 100 : ((expsValue / (expsValue + incsValue)) * 100).toFixed();
    return {
      expsValue,
      incsValue,
      cash,
      expPercent,
    }
  }
   calcCurrency = (value, from, to) => {
     const {currenciesToPln} = this.props;
     const resr = value * (currenciesToPln[from]) / (currenciesToPln[to])
     return parseFloat(resr.toFixed(2))
   }
  render(){
    const { expenses, incomes, currentCurrency } = this.props;
    const expList = _.map(expenses, e => ({
      ...e,
      value: this.calcCurrency(e.value, e.currency, currentCurrency)
    })); 
    const incList = _.map(incomes, e => ({
      ...e,
      value: this.calcCurrency(e.value, e.currency, currentCurrency)
    }));
    
    return (
      <div className="App">
        <Header/>
        <Form/>
        <div className="viewControl">
          <CurrencySelect/>
        </div>
        <div className="container">
          <TransactionsPanel list={incList} type="INC"/>
          <TransactionsPanel list={expList} type="EXP"/>
        </div>
      </div>
    );
  }
}
const mapStateToProps = function (state) {
  return {
    expenses: state.expenses,
    incomes: state.incomes,
    currenciesToPln: state.currenciesToPln,
    currentCurrency: state.settings.currentCurrency
  }
}
export default connect(mapStateToProps, {updateWallet, getItems})(App);
