import React from "react";
import LiItem from "../components/LiItem";
import Loader from "../components/Loader";
import "../components/styles/TransactionList.scss";
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import _ from 'lodash';
import {removeExpTransaction, removeIncTransaction} from '../actions/index';

class TransactionsPanel extends React.Component {
    state = {
        page: 1,
        pagesCount: 0
    }
    limit = 10;

    handleClick(offset) {
        this.setState({ offset });
    }

    componentWillReceiveProps() {
        const pagesCount = Math.ceil(Object.keys(this.props.list).length / this.limit);
        this.setState({
            pagesCount
        })
    }

    changePage = (type) => {
        let page = this.state.page
        page = type === "inc" ? page + 1 : page - 1;
        this.setState({
            page
        })
    }

    render() {
        let showFrom = this.state.page * this.limit - this.limit;
        showFrom = this.state.page === 1 ? 0 : showFrom;
        const showTo = showFrom + this.limit;
        const { props } = this;
        const list = _.map(props.list,((li, index) => (
            <LiItem
                delete={props.type === "INC"? props.removeIncTransaction : props.removeExpTransaction}
                key={index} 
                id={li._id}
                type={props.type} 
                name={li.text}
                value={li.value}
                expValue={props.expValue}
                cur={props.cur}>
            </LiItem>
        ))
        ).slice(showFrom, showTo)

        const pagination = () => {
            if (!this.state.pagesCount) return null
            const { page, pagesCount } = this.state
            const btnPrev = <Button variant="contained" onClick={this.changePage.bind(null, "dec")}>Prev</Button>
            const btnNext = <Button variant="contained" className="btnNext" onClick={this.changePage.bind(null, "inc")}>Next</Button>
            return (
                <div className="pagination">
                    {page !== 1 ? btnPrev : null}
                    {page !== pagesCount ? btnNext : null}
                </div>
            )
        }
        return (
            <>
                
                <ul className="financeBox">
                    {pagination()}
                    <h4 className="title">{props.type === "INC" ? "INCOMES" : "EXPENSES"}</h4>
                    {list}
                    <div style={{textAlign: 'center', paddingTop: 20}}>
                        {props.type === "EXP" ? (props.isExpLoading ? <Loader /> : null) : null}
                        {props.type === "INC" ? (props.isIncLoading ? <Loader /> : null) : null}  
                    </div>
                      
                </ul>
            </>
        )
    }
};

const mapStateToProps = state => ({
    cur: state.settings.currentCurrency,
    expValue: state.wallet.expsValue,
    isExpLoading: state.settings.expLoading,
    isIncLoading: state.settings.incLoading
});

export default connect(mapStateToProps, {removeExpTransaction, removeIncTransaction})(TransactionsPanel);
