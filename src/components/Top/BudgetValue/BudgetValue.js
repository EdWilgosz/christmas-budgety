import React from 'react';
import classes from './BudgetValue.module.css';

const BudgetValue = props => {
    return (
        <div className={classes.BudgetValueCont}>
            <div className={classes.BudgetValue}>$1,000.00</div>
        </div>
    );
}

export default BudgetValue;