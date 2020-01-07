import React from 'react';
import Input from '../Input/Input';
import SubmitButton from '../SubmitButton/SubmitButton';
import classes from './InputDrawer.module.css';


const InputDrawer = props => {

    let inputs = props.type === 'budget' ? 
        <div className={classes.InputDrawer}>
            <Input placeholder={'Enter budget'} />
            <div className={classes.Break} />
            <SubmitButton type={props.type} /> 
        </div> : 
        <div className={classes.InputDrawer}>
            <Input placeholder={'Who\'s it for?'} />
            <Input placeholder={'What is it?'}/>
            <Input placeholder={'Where to get it?'} />
            <Input placeholder={'How much is it?'} />
            <SubmitButton type={props.type} />
        </div>;

    return inputs;

}

export default InputDrawer;