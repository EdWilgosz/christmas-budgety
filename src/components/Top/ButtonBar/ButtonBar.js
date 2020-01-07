import React from 'react';
import classes from './ButtonBar.module.css';

const ButtonBar = props => {
    
    return (
        <div className={classes.ButtonBar}>
            <button className={classes.BudgetToggle}>Set Budget<i className="fas fa-hand-holding-usd"></i></button>
            <button className={classes.NewGiftToggle}>New Gift <i className="fas fa-gift"></i></button>
        </div>
    );
}

export default ButtonBar;