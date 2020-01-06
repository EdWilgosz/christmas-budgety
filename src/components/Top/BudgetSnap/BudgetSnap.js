import React from 'react';
import classes from './BudgetSnap.module.css';

const BudgetSnap = props => {

    return (
        <div className={classes.Cont} style={props.type === 'spent' ? {backgroundColor: 'rgba(255,80,73, 0.5)' } : {backgroundColor: 'rgba(102,242,46, 0.5)'} }>
        <div className={classes.Text}><p>{props.type === 'spent' ? 'ALREADY SPENT' : 'LEFT TO SPEND'} <span className={classes.Arrow}><i class="fas fa-arrow-right"></i></span></p></div>
            <div className={classes.SumCont}>    
                <div className={classes.Val}><p>{props.type === 'spent' ? '$567.98' : '$456.78'}</p></div>
                <div className={classes.Perc}><p>{props.type === 'spent' ? '54%' : '46%'}</p></div>
            </div>
        </div>
    );
}

export default BudgetSnap;