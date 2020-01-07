import React from 'react';
import BarButton from '../BarButton/BarButton';
import classes from './ButtonBar.module.css';

const ButtonBar = props => {

    return (
        <div className={classes.ButtonBar}>
            <BarButton type="budget" />
            <BarButton type="addgift" />
        </div>     
    );
}

export default ButtonBar;