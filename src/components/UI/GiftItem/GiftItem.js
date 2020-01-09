import React from 'react';
import classes from './GiftItem.module.css';

const GiftItem = props => {

    return (
        <div className={classes.GiftItem} id={props.id}>
            <div id="who" className={[classes.Who, classes.Field].join(' ')}>{props.who}</div>
            <div className={[classes.What, classes.Field].join(' ')}>{props.what}</div>
            <div className={[classes.Where, classes.Field].join(' ')}>{props.where}</div>
            <div className={[classes.Price, classes.Field].join(' ')}>{props.price}</div>
            <div className={[classes.Checked, classes.Icon].join(' ')} onClick={props.check}><i className="far fa-check-circle"></i></div>
            <div className={[classes.Delete, classes.Icon].join(' ')} onClick={props.delete}><i className="far fa-times-circle"></i></div>
        </div>
    );
}

export default GiftItem;