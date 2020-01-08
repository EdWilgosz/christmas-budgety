import React from 'react';
import Top from '../Top/Top';
import classes from './Layout.module.css';

const Layout = () => {

    return (
        <React.Fragment className={classes.BackgroundImage}>
            <Top />
        </React.Fragment>
    );
}

export default Layout;