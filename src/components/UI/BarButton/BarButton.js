import React from 'react';
import { useStore } from '../../../store/store';
import classes from './BarButton.module.css';

const BarButton = props => {

    const dispatch = useStore()[1];
    
    const toggleDrawer = () => {
        props.type === 'budget' ? dispatch('TOGGLE_BUDGET_DRAWER') : dispatch('TOGGLE_GIFT_DRAWER');
    }

    let type = props.type === 'budget';
    let text = type ? 'Set Budget ' : 'New Gift ';
    let icon = type ? <i className="fas fa-hand-holding-usd" style={{paddingLeft: '1%'}}></i> : <i className="fas fa-gift" style={{paddingLeft: '1%'}}></i>;

    return <button className={classes.BarButton} onClick={toggleDrawer}>{text}{icon}</button>;
}

export default BarButton;