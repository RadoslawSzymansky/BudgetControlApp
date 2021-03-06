import React from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux';

const FinanceList = props => {
    let percentValue = (props.value / props.expValue * 100).toFixed(0);
    const percent = props.type === "EXP" ? <span className="expensesPercent">{percentValue}%</span> : null;
    // console.log(props)
    return (
        <li>
            <p className="name">{props.name}</p>
            <div className="wrapper">
                <p className="value">{props.value} <span className="cur">{props.cur}</span></p>
                <button onClick={props.isRemoving? null : props.delete.bind(null, props.id)} className="btnDelete">X</button>
                {percent}
            </div>
        </li>
    )
};

FinanceList.propTypes = {
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    expValue: PropTypes.number,
};

FinanceList.defaultProps = {
    type: 'Sorry no data',
    name: ' Sory no name',
    value: 0,
    expValue: 0
};

const mapStateToProps = state => ({
    isLoading: state.settings.isRemoving
})
export default connect(mapStateToProps)(FinanceList);