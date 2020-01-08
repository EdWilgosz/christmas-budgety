import React from 'react';
import Top from '../Top/Top';
import Bottom from '../Bottom/Bottom';
import classes from './Layout.module.css';

const Layout = () => {

    return (
        <React.Fragment>
        <div className={classes.BackgroundImage}>
        </div>
        <div style={{position: 'fixed', width: '100%', height: '100%', top: '0', left: '0', margin: '0 auto'}}>
            <Top />
        </div>
        <Bottom />
        </React.Fragment>
    );
}

export default Layout;