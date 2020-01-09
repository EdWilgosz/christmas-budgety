import React, { useEffect } from 'react';
import { useStore } from '../../../store/store';
import firebase from 'firebase/app';
import 'firebase/database';

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
                let newGift = <GiftItem key={id} id={id} who={who} what={what} where={where} price={price} check={e=>check(e)} delete={e=>remove(e)}/>;
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


    let boughtList = [];

    useEffect(() => {
        const database = firebase.database();

        let newBoughtList = database.ref(`purchased/555`).once('value', snapshot => {
            snapshot.forEach(childSnapshot => {
                let id = childSnapshot.val().id;
                let who = childSnapshot.val().who.toUpperCase();
                let what = childSnapshot.val().what.toUpperCase();;
                let where = childSnapshot.val().where.toUpperCase();;
                let price = childSnapshot.val().price;
                let boughtGift = <GiftItem key={id} id={id} who={who} what={what} where={where} price={price} check={e=>uncheck(e)} delete={e=>remove(e)}/>;
                boughtList.push(boughtGift);
            })
            return boughtList;
        })
        .then(val => {
            if (boughtList !== state.boughtList) {
                dispatch('UPDATE_BOUGHT_LIST', boughtList);
                return boughtList;
            }
        })
    }, [dispatch]);

    let check = e => {
        // let curGift = e.target.closest('div').parentNode.childNodes[1].innerText;
        let curGift = e.target.closest('div').parentNode.id;
        let selected = state.giftList.filter(cur => cur.key === curGift);
        let payload = {
            id: selected[0].props.id,
            who: selected[0].props.who,
            what: selected[0].props.what,
            where: selected[0].props.where,
            price: selected[0].props.price

        }
        dispatch('CHECK_GIFT', payload);
    }

    let uncheck = e => {
        console.log('uncheck')
    }

    let remove = e => {
        const id = e.target.closest('div').parentNode.id;
        console.log(id);
        dispatch('REMOVE_GIFT', id);
    }

    return (
        <React.Fragment>
            {state.giftList.map(cur => cur)}
            <GiftTitleBar />
        </React.Fragment>
    );
}

export default ToPurchaseList;