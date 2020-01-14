import React from 'react';
import classes from './BudgetCont.module.css';

import BudgetValue from '../../components/Top/BudgetValue/BudgetValue';
import BudgetSnap from '../../components/Top/BudgetSnap/BudgetSnap';

const BudgetCont = () => {

    return (
        <div className={classes.BudgetCont}>
            <BudgetValue />
            <div className={classes.SpendSpentCont}>
                <BudgetSnap type='spent'/>
                <BudgetSnap type='tospend'/>
            </div>
        </div>
    );
}

export default BudgetCont;