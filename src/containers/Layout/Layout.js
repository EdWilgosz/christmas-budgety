import React from 'react';
import classes from './Layout.module.css';

import Top from '../Top/Top';
import Bottom from '../Bottom/Bottom';

const Layout = () => {

    return (
        <React.Fragment>
            <div className={classes.BackgroundImage}>
            </div>
            <div className={classes.TopCont}>
                <Top />
            </div>
            <Bottom />
        </React.Fragment>
    );
}

export default Layout;