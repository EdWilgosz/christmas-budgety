import React from 'react';
import { useStore } from '../../../store/store';
import classes from './BudgetValue.module.css';

const BudgetValue = props => {

    let budgetValue = useStore()[0].budgetValue;

    return (
        <div className={classes.BudgetValueCont}>
            <div className={classes.BudgetValue}>{budgetValue}</div>
        </div>
    );
}

export default BudgetValue;