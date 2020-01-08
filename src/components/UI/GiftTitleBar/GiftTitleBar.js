import React from 'react';
import classes from './GiftTitleBar.module.css';

const GiftTitleBar = props => {

    return (
        <div className={classes.GiftTitleBar}>
            <div className={classes.Who}>WHO</div>
            <div className={classes.What}>WHAT</div>
            <div className={classes.Where}>WHERE</div>
            <div className={classes.Price}>PRICE</div>
        </div>
    )
}

export default GiftTitleBar;