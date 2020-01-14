import React from 'react';
import classes from './BoughtItem.module.css';

const BoughtItem = props => {

    return (
        <div className={classes.BoughtItem} id={props.id}>
            <div className={[classes.Who, classes.Field].join(' ')}>{props.who}</div>
            <div className={[classes.What, classes.Field].join(' ')}>{props.what}</div>
            <div className={[classes.Where, classes.Field].join(' ')}>{props.where}</div>
            <div className={[classes.Price, classes.Field].join(' ')}>{props.price}</div>
            <div className={[classes.Checked, classes.Icon].join(' ')} title={'Uncheck'} onClick={props.uncheck}><i className="fas fa-undo-alt"></i></div>
            <div className={[classes.Delete, classes.Icon].join(' ')} title={'Delete'} onClick={props.removeBoughtItem}><i className="fas fa-times"></i></div>
        </div>
    );
}

export default BoughtItem;