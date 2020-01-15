import React from 'react';
import classes from './GiftItem.module.css';

const GiftItem = props => {

    return (
        <div className={classes.GiftItem} id={props.id}>
            <div className={[classes.Who, classes.Field].join(' ')} title={props.who}>{props.who}</div>
            <div className={[classes.What, classes.Field].join(' ')} title={props.what}>{props.what}</div>
            <div className={[classes.Where, classes.Field].join(' ')} title={props.where} >{props.where}</div>
            <div className={[classes.Price, classes.Field].join(' ')} title={props.price}>{props.price}</div>
            <div className={[classes.Checked, classes.Icon].join(' ')} title='Mark as bought' onClick={props.check}><i className="far fa-check-circle"></i></div>
            <div className={[classes.Delete, classes.Icon].join(' ')} title='Delete' onClick={props.removeGift}><i className="far fa-times-circle"></i></div>
        </div>
    );
}

export default GiftItem;