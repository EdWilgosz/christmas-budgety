import React from 'react';
import BarButton from '../BarButton/BarButton';
import classes from './ButtonBar.module.css';

const ButtonBar = props => {

    return (
        <div className={classes.ButtonBar}>
            <BarButton inputType="budget" />
            <BarButton inputType="addgift" />
        </div>     
    );
}

export default ButtonBar;