import React from 'react';
import Top from '../Top/Top';
import Bottom from '../Bottom/Bottom';
import classes from './Layout.module.css';

// import ToPurchaseList from '../Bottom/ToPurchaseList/ToPurchaseList';
// import PurchasedList from '../Bottom/PurchasedList/PurchasedList';

const Layout = () => {

    return (
        <React.Fragment>
        <div>
            <div className={classes.BackgroundImage}>
            </div>
            <div style={{position: 'sticky', width: '100%', height: '100%', top: '0', left: '0', margin: '0 auto'}}>
                <Top />
            </div>
        </div>
        {/* <ToPurchaseList />
        
        <PurchasedList /> */}
        <Bottom />
        </React.Fragment>
    );
}

export default Layout;