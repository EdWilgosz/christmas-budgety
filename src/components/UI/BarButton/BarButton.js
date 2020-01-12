import React from 'react';
import { useStore } from '../../../store/store';
import classes from './BarButton.module.css';

const BarButton = props => {

    const [state, dispatch] = useStore();
    
    const toggleDrawer = () => !state.isLoggedIn ? dispatch('TOGGLE_LOGIN') : props.inputType === 'budget' ? dispatch('TOGGLE_BUDGET_DRAWER') : dispatch('TOGGLE_GIFT_DRAWER');
    // const toggleDrawer = () => !state.isLoggedIn ? dispatch('TOGGLE_LOGIN') : props.type === 'budget' ? dispatch('TOGGLE_BUDGET_DRAWER') : dispatch('TOGGLE_GIFT_DRAWER');

    let type = props.inputType === 'budget';
    let text = type ? 'Set Budget ' : 'New Gift ';
    let icon = type ? <i className="fas fa-hand-holding-usd" style={{paddingLeft: '1%'}}></i> : <i className="fas fa-gift" style={{paddingLeft: '1%'}}></i>;

    return <button className={classes.BarButton} onClick={toggleDrawer}>{text}{icon}</button>;
}

export default BarButton;