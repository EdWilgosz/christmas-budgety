import React from 'react';
import classes from './BarButton.module.css';

const BarButton = props => {

    let type = props.type === 'budget';
    let text = type ? 'Set Budget ' : 'New Gift ';
    let icon = type ? <i className="fas fa-hand-holding-usd" style={{paddingLeft: '1%'}}></i> : <i className="fas fa-gift" style={{paddingLeft: '1%'}}></i>;

    return <button className={classes.BarButton}>{text}{icon}</button>;
}

export default BarButton;