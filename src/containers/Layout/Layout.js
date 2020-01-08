import React from 'react';
import Top from '../Top/Top';
import classes from './Layout.module.css';

const Layout = () => {

    return (
        <div className={classes.BackgroundImage}>
            <Top />
        </div>
    );
}

export default Layout;