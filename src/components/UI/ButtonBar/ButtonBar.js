import React from 'react';
import BarButton from '../BarButton/BarButton';
import classes from './ButtonBar.module.css';

const ButtonBar = props => {
    
    const toggleBudgetDrawer = () => {
        
    }

    return (
        <div className={classes.ButtonBar}>
            <BarButton type="budget" onClick={toggleBudgetDrawer}/>
            <BarButton type="addgift" />
        </div>     
    );
}

export default ButtonBar;