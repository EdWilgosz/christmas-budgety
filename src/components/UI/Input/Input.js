import React from 'react';
import classes from './Input.module.css';

const Input = props => {

    return <input type="text" className={classes.Input} placeholder={props.placeholder}/>
}

export default Input;