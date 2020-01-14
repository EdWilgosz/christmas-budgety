import React from 'react';
import { useStore, FORMAT_NUMBER } from '../../../store/store';
import classes from './BudgetValue.module.css';

const BudgetValue = () => {

    const budgetValue = FORMAT_NUMBER(useStore()[0].budgetValue);

    return (
        <div className={classes.BudgetValueCont}>
            <div className={classes.BudgetValue}>{budgetValue}</div>
        </div>
    );
}

export default BudgetValue;