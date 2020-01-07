import React from 'react';
import classes from './SubmitButton.module.css';

const SubmitButton = props => {

    let text = props.type === 'budget' ? 'Set Budget' : 'Add Gift';
    let icon = props.type === 'budget' ? null : <i className="fas fa-plus"></i>;

    return <button className={classes.SubmitButton}>{text} {icon}</button>;
}

export default SubmitButton;