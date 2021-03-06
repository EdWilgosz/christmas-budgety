import React from 'react';
import classes from './Input.module.css';

const Input = props => {

    return <input type={props.type} className={classes.Input} placeholder={props.placeholder} id={props.inputType} maxLength={props.maxLength} required={props.required} />
}

export default Input;