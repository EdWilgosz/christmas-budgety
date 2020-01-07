import React from 'react';
import classes from './BudgetSnap.module.css';

const BudgetSnap = props => {

    let type = props.type === 'spent';
    let contType = [type ? classes.Spent : classes.ToSpend, classes.Cont].join(' ');
    let textType = type ? 'ALREADY SPENT' : 'LEFT TO SPEND';
    let valType = type ? '$567.98' : '$456.78';
    let percType = type ? '54%' : '46%';

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