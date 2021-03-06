import React from 'react';
import { useStore, FORMAT_NUMBER } from '../../../store/store';
import classes from './BudgetSnap.module.css';


const BudgetSnap = props => {

    const state = useStore()[0];
    const spentValue = FORMAT_NUMBER(state.spentValue);
    const toSpendValue = FORMAT_NUMBER(state.toSpendValue);
    // const spentPerc = !state.spentPerc || state.spentPerc < 1 ? '--' : state.spentPerc > 100 ? '100' : state.spentPerc;
    const spentPerc = state.spentPerc > 100 ? '100' : state.spentPerc > 0 ? state.spentPerc : '--';
    const toSpendPerc = state.toSpendPerc > 0 ? state.toSpendPerc : '--';

    const type = props.type === 'spent';
    const contType = [type ? classes.Spent : classes.ToSpend, classes.Cont].join(' ');
    const textType = type ? 'ALREADY SPENT' : 'LEFT TO SPEND';
    const valType = type ? spentValue : toSpendValue;
    const percType = type ? `${spentPerc}%` : `${toSpendPerc}%`;

    return (
        <div className={contType}>
            <div className={classes.Text}><p>{textType} <span className={classes.Arrow}><i className="fas fa-arrow-right"></i></span></p></div>
            <div className={classes.SumCont}>    
                <div className={classes.Val}><p>{valType}</p></div>
                <div className={classes.Perc}><p>{percType}</p></div>
            </div>
        </div>
    );
}

export default BudgetSnap;