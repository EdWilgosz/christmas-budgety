import React, { useEffect } from 'react';
import { useStore } from '../../../store/store';
import firebase from 'firebase/app';
import 'firebase/database';
import classes from './ToPurchaseList.module.css';

import GiftTitleBar from '../../../components/UI/GiftTitleBar/GiftTitleBar';
import GiftItem from '../../../components/UI/GiftItem/GiftItem';

const ToPurchaseList = props => {

    const [state, dispatch] = useStore();
    
    let giftList = [];

    useEffect(() => {
        const database = firebase.database();

        let newList = database.ref(`toPurchase/555`).once('value', snapshot => {
            snapshot.forEach(childSnapshot => {
                let id = childSnapshot.val().id;
                let who = childSnapshot.val().who.toUpperCase();
                let what = childSnapshot.val().what.toUpperCase();;
                let where = childSnapshot.val().where.toUpperCase();;
                let price = childSnapshot.val().price;
                // let newGift = <div key={id} id={id}>{`${who} ${where} ${what} ${price}`}</div>;
                let newGift = <GiftItem key={id} id={id} who={who} what={what} where={where} price={price} />;
                giftList.push(newGift);
            })
            return giftList;
        })
        .then(val => {
            if (giftList !== state.giftList) {
                dispatch('UPDATE_GIFT_LIST', giftList);
                return giftList;
            }
        })
    }, [dispatch]);

    return (
        <div className={classes.ToPurchaseList}>
            <GiftTitleBar />
            {state.giftList.map(cur => cur)}
        </div>
    );
}

export default ToPurchaseList;