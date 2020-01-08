import React from 'react';
import Top from '../Top/Top';
import ToPurchaseList from '../Bottom/ToPurchaseList/ToPurchaseList';
import classes from './Layout.module.css';

const Layout = () => {

    return (
        <div className={classes.BackgroundImage}>
            <Top />
            <ToPurchaseList />
        </div>
    );
}

export default Layout;