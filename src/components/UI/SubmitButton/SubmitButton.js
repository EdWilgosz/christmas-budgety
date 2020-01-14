import React from 'react';
import classes from './SubmitButton.module.css';

const SubmitButton = props => {

    const text = props.inputType === 'login' ? 'Login' : props.inputType === 'createAccount' ? 'Create Account' : props.inputType === 'budget' ? 'Set Budget' : 'Add Gift';
    const icon = props.inputType === 'gift' ? <i className="fas fa-plus"></i> : null;

    return <button className={classes.SubmitButton} onClick={props.clicked}>{text} {icon}</button>;
}

export default SubmitButton;